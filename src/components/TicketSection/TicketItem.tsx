import React from 'react';
import clsx from 'clsx';
import { Minus, Plus, SquareCheck, Square } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Ticket {
    id: string;
    name: string;
    price: number;
    quantity: number;
    maxPerUser: number;
    soldOut: boolean;
    canSelectMultiple: boolean;
    stopId: string;
    available?: any; // Add this line to define available tickets
}


interface TicketItemProps {
    ticket: Ticket;
    isChecked: boolean;
    onToggle: () => void;
    onDecrease: () => void;
    onIncrease: () => void;
    quantity: number;
    theme: 'dark' | 'light';
}

const TicketItem: React.FC<TicketItemProps> = ({
    ticket,
    isChecked,
    onToggle,
    onDecrease,
    onIncrease,
    quantity,
    theme,
}) => {
    return (
        <div
            className={clsx(
                'flex items-center justify-between p-4 rounded-lg bg-ticket-light-bg dark:bg-ticket-dark-bg text-black dark:text-white',
                ticket.soldOut ? 'border-gray-400 text-gray-400' : 'border-gray-200'
            )}
        >
            <div className="flex items-center">
                <button
                    className="flex items-center justify-center"
                    onClick={onToggle}
                    disabled={ticket.soldOut}
                >
                    {isChecked ? (
                        <SquareCheck className="h-7 w-7 text-current" />
                    ) : (
                        <Square className="h-7 w-7 text-current" />
                    )}
                </button>
                <div className="pl-4">
                    <h3 className={` text-sm text-[14px] ${ticket.soldOut ? 'line-through' : ''}`}>{ticket.name}</h3>
                    <p className={`font-bold text-[16px] text-sm text-sm ${ticket.soldOut ? 'line-through' : ''}`}>${ticket.price}</p>
                </div>
            </div>
            {ticket.soldOut ? (
                <span className="text-white py-0.5 px-4 rounded bg-[#FF0202] text-center font-bold">Sold Out</span>
            ) : (
                isChecked && (
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            className={cn(
                                'w-6 h-6 rounded-full bg-[#0486FF] p-0 transition-colors',
                                'hover:bg-[#0486FF]/90',
                                'disabled:bg-[#0486FF]/40',
                                'custom-btn',
                                'flex justify-center items-center'
                            )}
                            onClick={onDecrease}
                            disabled={quantity <= 1}
                        >
                            <Minus className={cn('h-4 w-4', theme === 'dark' ? 'text-black' : 'text-white')} />
                        </button>
                        <span className="text-2xl font-bold leading-[29.23px] font-[JKRHaasGrotesk]">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            className={cn(
                                'w-6 h-6 rounded-full bg-button-background p-0 transition-colors',
                                'disabled:bg-[#0486FF]/40',
                                'custom-btn',
                                'flex justify-center items-center'
                            )}
                            onClick={onIncrease}
                            disabled={quantity >= ticket.available}
                        >
                            <Plus className={cn('h-4 w-4', theme === 'dark' ? 'text-black' : 'text-white')} />
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default TicketItem;
