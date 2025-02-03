import PoweredBy from '../PoweredBy';
import clsx from 'clsx';
import Header from '../Header';

interface Ticket {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}
interface TicketListProps {
    tickets: { ticks: Ticket[]; total: number };
    handleBackClick?: () => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, handleBackClick }) => {
    const totalAmount = tickets?.ticks?.reduce((sum, ticket) => sum + ticket.total, 0);

    return (
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex flex-col items-center px-4">
            <Header title="Confirmation" onBackClick={handleBackClick} />
            <img src="/PaymentSuccess.png" alt="Payment Successful" className="w-full max-w-md my-6" />
            {tickets?.ticks?.map((ticket) => (
                <div
                    key={ticket.id}
                    className={clsx(
                        'flex justify-between p-4 rounded-lg bg-ticket-light-bg dark:bg-ticket-dark-bg text-black dark:text-white mt-2 w-full'
                    )}
                >
                    <div className="flex items-center">
                        <div className="pl-4">
                            <h3 className="text-lg font-bold">{ticket.name}</h3>
                            <p className="text-lg font-bold">
                                ${ticket.total}
                            </p>
                        </div>
                    </div>
                    <p className="font-bold self-center">
                        x {ticket.quantity}
                    </p>

                </div>
            ))}

            <div className="flex justify-center items-center bg-white text-black mt-4 p-4 w-full">
                <h3 className="text-xl font-bold mr-2">You paid</h3>
                <span className="text-xl font-bold">${totalAmount}</span>
            </div>

            <PoweredBy logoSrc="/logo.png" altText="Vipass logo image" />
        </div>
    );
};

export default TicketList;
