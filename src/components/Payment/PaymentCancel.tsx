import PoweredBy from '../PoweredBy';
import clsx from 'clsx';
import Header from '../Header';

interface TicketListProps {
    handleBackClick?: () => void;
}

const PaymentCancel: React.FC<TicketListProps> = ({ handleBackClick }) => {

    return (
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex flex-col items-center px-4">
            <Header title="" onBackClick={handleBackClick} />
            <img src="/PaymentCancel.png" alt="Payment Successful" className="w-[90px] h-[90px] my-6" />
            <div className={clsx('flex justify-between p-4 rounded-lg text-color-red mt-2')}>
                <div className="flex items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-red text-[24px] font-bold font-jkr leading-[29.23px]">
                            There was an error<br />
                            with your purchase.
                        </h3>

                        <h3 className="text-red text-[16px] font-bold font-jkr leading-[29.23px] mt-5">
                            Please try again
                        </h3>
                        <h3 className="text-white text-[16px] font-bold font-jkr leading-[29.23px] mt-5">
                            If this error persists
                        </h3>
                        <h4 className="text-blue-500 text-[18px] font-bold font-jkr leading-[22px] border-b-2 border-button-background">
                            Please contact us
                        </h4>
                    </div>
                </div>
            </div>
            <PoweredBy logoSrc="/logo.png" altText="Vipass logo image" />
        </div>
    );
};

export default PaymentCancel;
