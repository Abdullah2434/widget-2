import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import PoweredBy from '../PoweredBy';
import { useState } from 'react';
import { postRequest } from '../../api/ApiFunctions';
import TicketList from './SuccessTicketSection';
import Header from '../Header';
import PaymentCancel from './PaymentCancel';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ paymentIntentClientSecret, onPaymentSuccess, setPaymentStatus, handleBackClick }: {
  paymentIntentClientSecret: string;
  onPaymentSuccess: () => void;
  setPaymentStatus: React.Dispatch<React.SetStateAction<'pending' | 'success' | 'error'>>;
  handleBackClick?: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const Price = localStorage.getItem('TotalPrice');
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleSubmitPayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setPaymentStatus('error')
      console.error(submitError);
      return;
    }

    const { error } = await stripe.confirmPayment({
      clientSecret: paymentIntentClientSecret,
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setPaymentStatus('error')
      console.error("error" + JSON?.stringify(error));
      return;
    }
    console.log("PAYMENT.SUCCESS");
    onPaymentSuccess();
    setPaymentStatus("success");
  };

  const hasLoaded = stripe != null && elements != null;
  const isDisabled = !hasLoaded || isSubmitting;
  const Data = JSON.parse(localStorage.getItem('CompleteCartData') || '{}');

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <Header title="Payment" onBackClick={handleBackClick} />
      <div className="rounded-md bg-gray-5 px-3 py-2 text-black dark:text-white">
        <span className="text-base font-bold">Payment Summary</span>

        <div className="mt-4 flex flex-col gap-1 text-foreground/80">
          {Data?.ticketDetails?.length > 0 ? (
            Data.ticketDetails.map((t: any) => (
              <div key={t.title} className="flex gap-2 text-sm">
                <div className="flex flex-1 gap-1">
                  <span>{t.title}</span>
                  <span>( x{t.quantity} )</span>
                </div>
                <span className="text-foreground">${t.price}</span>
                <span className="text-foreground">Total: ${t.totalPrice}</span> {/* Display total price */}
              </div>
            ))
          ) : (
            <p>No tickets selected</p>
          )}
        </div>

        <div className="mt-2 flex gap-2">
          <span className="text-2xl font-bold leading-[29.23px] font-[JKRHaasGrotesk]">Total</span>
          <span className="text-2xl font-bold leading-[29.23px] font-[JKRHaasGrotesk]">${Price}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSubmitPayment)}>
        <PaymentElement />
        <div className="mt-8">
          <button
            type="submit"
            className={clsx(
              'inline-flex h-10 w-full items-center justify-center rounded-3xl bg-button-background px-4 transition-colors ',
              'whitespace-nowrap text-base font-medium text-background',
              'hover:bg-foreground/90',
              'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/90 focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:bg-foreground/40 disabled:text-background',
            )}
            disabled={isDisabled}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>Pay now - ${Price}</>
            )}
          </button>
          <PoweredBy logoSrc="/logo.png" altText="Vipass logo image" />
        </div>
      </form>
    </div>
  );
}

type CheckoutPaymentStepProps = {
  paymentDetails?: {
    paymentIntentClientSecret?: string;
    ephemeralKeySecret?: string;
  };
  cartData?: any;
  backHandling?: () => void;
};

export function CheckoutPaymentStep({ paymentDetails, cartData, backHandling }: CheckoutPaymentStepProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [completeCartData, setCompleteCartData] = useState<{ ticks: any; total: number } | null>(null);

  if (!paymentDetails) {
    return (
      <div className="w-1/2 flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" strokeWidth={1} />
      </div>
    )
  }

  if (!paymentDetails?.paymentIntentClientSecret) {
    return <p className="text-red-500">Error: Payment details are missing.</p>;
  }

  const handlePaymentSuccess = async () => {
    try {
      if (!cartData?.cartId) {
        console.error("Error: cartId is missing");
        return;
      }
      const payload = {
        cartId: cartData.cartId,
      };
      const res = await postRequest(`carts/${payload.cartId}/complete`, payload);

      if (res && res.ticks && res.total !== undefined) {
        setCompleteCartData(res);  // Set complete cart data with the expected structure
      } else {
        console.error("Invalid response structure", res);
      }
    } catch (error) {
      console.error("Error completing cart:", error);
    }
  };

  return (
    <>
      {paymentStatus === 'pending' && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentDetails?.paymentIntentClientSecret,
            customerSessionClientSecret: paymentDetails?.ephemeralKeySecret,
            appearance: {
              theme: 'night',
              variables: {
                borderRadius: '0.375rem',
                colorPrimary: '#fff',
                colorBackground: '#313131',
              },
            },
          }}
        >
          <PaymentForm
            paymentIntentClientSecret={paymentDetails?.paymentIntentClientSecret}
            handleBackClick={backHandling}
            onPaymentSuccess={handlePaymentSuccess}
            setPaymentStatus={setPaymentStatus}
          />
        </Elements>
      )}

      {paymentStatus === 'success' && completeCartData && (
        <TicketList tickets={completeCartData} handleBackClick={backHandling} />
      )}

      {paymentStatus === 'error' && (
        <PaymentCancel handleBackClick={backHandling} />
      )}
    </>
  );
}
