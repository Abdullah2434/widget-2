/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JsonData from "./Data.json";

interface Ticket {
    id: string;
    name: string;
    price: number;
    quantity: number;
    maxPerUser: number;
    soldOut: boolean;
    canSelectMultiple: boolean;
    stopId: string;
}

interface UseTicketsReturn {
    tickets: Ticket[];
    checkedState: boolean[];
    quantities: number[];
    error: string | null;
    promo: any;
    toggleCheckbox: (index: number) => void;
    increaseQuantity: (index: number) => void;
    decreaseQuantity: (index: number) => void;
    isCheckoutEnabled: boolean;
    fetchPromo: () => Promise<void>;
    loading: boolean;
}

export const useTickets = (): UseTicketsReturn => {
    const { slug } = useParams<{ slug: string }>(); // Get the slug from URL params
    const [checkedState, setCheckedState] = useState<boolean[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [promo, setPromo] = useState<any>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPromo = async () => {
        if (!slug) return;

        setLoading(true);
        try {
            const response = await fetch(`https://vipass-dev-api.web.app/promos/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch promo data");
            }

            const data = await response.json();
            if (data?.stops) {
                const stopTickets: Ticket[] = data.stops.flatMap((stop: any) =>
                    stop.ticks.map((ticket: any) => ({
                        id: ticket.id,
                        name: ticket.name,
                        price: ticket.price,
                        quantity: ticket.quantity,
                        maxPerUser: ticket.maxPerUser,
                        soldOut: ticket.quantity === 0,
                        canSelectMultiple: ticket.canSelectMultiple,
                        stopId: stop.id,
                    }))
                );
                
                
                setPromo(data);
                setTickets(stopTickets);
                setCheckedState(Array(stopTickets.length).fill(false));
                setQuantities(Array(stopTickets.length).fill(1));
            }
        } catch (err: any) {
            if (JsonData) {
                const stopTickets: Ticket[] = JsonData.stops.flatMap((stop: any) =>
                    stop.ticks.map((ticket: any) => ({
                        id: ticket.id,
                        name: ticket.name,
                        price: ticket.price,
                        quantity: ticket.quantity,
                        maxPerUser: ticket.maxPerUser,
                        soldOut: ticket.quantity === 0,
                        canSelectMultiple: ticket.canSelectMultiple,
                        stopId: stop.id,
                    }))
                );
                setPromo(JsonData);
                setTickets(stopTickets);
                setCheckedState(Array(stopTickets.length).fill(false));
                setQuantities(Array(stopTickets.length).fill(1));
            }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromo();
    }, [slug]);

    const toggleCheckbox = (index: number) => {
        const updatedCheckedState = [...checkedState];
        updatedCheckedState[index] = !updatedCheckedState[index];
        setCheckedState(updatedCheckedState);

        if (!updatedCheckedState[index]) {
            const updatedQuantities = [...quantities];
            updatedQuantities[index] = 1;
            setQuantities(updatedQuantities);
        }
    };

    const increaseQuantity = (index: number) => {
        const updatedQuantities = [...quantities];
        if (updatedQuantities[index] < tickets[index].quantity) {
            updatedQuantities[index]++;
            setQuantities(updatedQuantities);
        }
    };

    const decreaseQuantity = (index: number) => {
        const updatedQuantities = [...quantities];
        if (updatedQuantities[index] > 0) updatedQuantities[index]--;
        setQuantities(updatedQuantities);
    };

    const isCheckoutEnabled = checkedState.some(
        (isChecked, index) => isChecked && quantities[index] > 0
    );

    return {
        tickets,
        checkedState,
        quantities,
        error,
        promo,
        toggleCheckbox,
        increaseQuantity,
        decreaseQuantity,
        isCheckoutEnabled,
        fetchPromo,
        loading
    };
};
