import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SignInComponent } from './SignIn';
import TicketItem from './TicketItem';
import PoweredBy from '../PoweredBy';
import { useTickets } from './../../hooks/useTickets';
import EventCard from './EventCard';
import { CheckoutPaymentStep } from '../Payment/CheckoutPaymentStep';
import { Loader2 } from 'lucide-react';
import { postRequest } from '../../api/ApiFunctions';

// Define type for cart data
type CartCreateData = {
    payment: {
        paymentIntentClientSecret?: string;
        ephemeralKeySecret?: string;
        amount: number;
        method: string;
    };
};

function ChildComponent() {
    const { theme, toggleTheme } = useTheme();
    const { tickets, checkedState, quantities, toggleCheckbox, increaseQuantity, decreaseQuantity, isCheckoutEnabled, fetchPromo, promo, loading } = useTickets();
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [displayPaymentRequest, setDisplayPaymentRequest] = useState(false);
    const [createCart, setCreateCart] = useState({});
    const [cartCreateData, setCartCreateData] = useState<CartCreateData | undefined>(undefined); // Apply type here

    useEffect(() => {
        fetchPromo();
    }, []);
    
    const getSelectedTickets = () => {
        return tickets
            .map((ticket, index) => ({
                id: ticket.id,
                quantity: quantities[index],
            }))
            .filter(ticket => checkedState[tickets.findIndex(t => t.id === ticket.id)] && ticket.quantity > 0);
    };
    
    const handleCreateCart = () => {
        const selectedTickets = getSelectedTickets();

        const ticketDetails = selectedTickets.map(ticket => {
            const ticketData = tickets.find(t => t.id === ticket.id);

            if (!ticketData) {
                console.error(`Ticket with ID ${ticket.id} not found.`);
                return null;
            }
            const totalPrice = ticketData.price * ticket.quantity;

            return {
                title: ticketData.name,
                quantity: ticket.quantity,
                price: ticketData.price,
                totalPrice: totalPrice.toFixed(2)
            };
        }).filter(item => item !== null);

        const createCart = {
            promoId: promo?.id,
            ticks: selectedTickets,
            ticketDetails: ticketDetails,
        };

        setCreateCart(createCart);
        localStorage.setItem('CompleteCartData', JSON.stringify(createCart));
    };

    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        const total = tickets.reduce((total, ticket, index) => {
            if (checkedState[index] && quantities[index] > 0) {
                return total + ticket.price * quantities[index];
            }
            return total;
        }, 0);

        setTotalPrice(parseFloat(total.toFixed(2)));
        localStorage.setItem('TotalPrice', total.toFixed(2));
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [checkedState, quantities]);

    const handleCartCreation = () => {
        setIsSignInOpen(false);
        setDisplayPaymentRequest(true);
        signInWithSocialAuth(createCart);
    };

    const signInWithSocialAuth = async (cartData: unknown) => {
        try {
            const data = await postRequest('carts', cartData);
            setCartCreateData(data); // Now TypeScript knows cartCreateData has the correct shape
        } catch (error) {
            console.error('Error during sign-in or cart creation:', error);
        }
    };

    const handlePaymentNavigation = () => {
        setDisplayPaymentRequest(false);
        setIsSignInOpen(false);
    };

    return (
        <div className={`flex flex-col md:flex-row items-center p-6 min-h-screen  dark:text-text-dark bg-white text-text-light`}>
            {loading ? <div className="flex justify-center items-center fixed inset-0 bg-white dark:bg-transparent">
                <Loader2 className="h-16 w-16 animate-spin text-primary" strokeWidth={1} />
            </div> : <>
                <EventCard
                    imageSrc="/EventImage.png"
                    title="Prague’s Biggest New Year’s Eve Event 2024"
                    description="A new concept Prague has been waiting for a long time. Bringing the Afro House community together with special guests from around the world! Every Month at Roxy Club Prague!"
                    onThemeChange={toggleTheme}
                />
                {displayPaymentRequest ? (
                    <CheckoutPaymentStep paymentDetails={cartCreateData?.payment} cartData={cartCreateData} backHandling={handlePaymentNavigation} />
                ) : null}
                {isSignInOpen ? (
                    <SignInComponent
                        isOpen={isSignInOpen}
                        onClose={() => { setIsSignInOpen(false); }}
                        onSignInSuccess={handleCartCreation}
                        getNextUrl={() => {
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.set('continueCheckout', 'true');
                            return `${window.location.pathname}?${searchParams.toString()}`;
                        }}
                    />
                ) : (
                    !displayPaymentRequest &&
                    <div className="w-full md:w-1/2 mt-6 md:mt-0">
                        <p className="text-[12px] font-light mb-4 dark:text-white text-black text-center">Select Tickets</p>
                        <div className="space-y-4">
                            {tickets.map((ticket, index) => (
                                <TicketItem
                                    key={ticket.id}
                                    ticket={ticket}
                                    isChecked={checkedState[index]}
                                    onToggle={() => !ticket.soldOut && toggleCheckbox(index)}
                                    onDecrease={() => decreaseQuantity(index)}
                                    onIncrease={() => increaseQuantity(index)}
                                    quantity={quantities[index]}
                                    theme={theme}
                                />
                            ))}
                        </div>
                        <button
                            className={`mt-6 w-full py-3 rounded-lg font-[JKRHaasGrotesk] text-[24px] text-white dark:text-black font-bold ${isCheckoutEnabled
                                ? 'bg-button-background'
                                : 'bg-button-disbale cursor-not-allowed'
                                } `}
                            disabled={!isCheckoutEnabled}
                            onClick={() => {
                                setIsSignInOpen(true);
                                handleCreateCart();
                            }}
                        >
                            Checkout
                            {isCheckoutEnabled && (
                                <>
                                    <span className="ml-2">
                                        $
                                    </span>
                                    <span className="ml-0">
                                        {totalPrice}
                                    </span>
                                </>
                            )}
                        </button>
                        <PoweredBy logoSrc="/logo.png" altText="Vipass logo image" />
                    </div>
                )}</>}
        </div>
    );
};

export default ChildComponent;
