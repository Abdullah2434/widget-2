import { useState, useEffect } from 'react';

interface Ticket {
    id: number;
    name: string;
    price: string;
    soldOut: boolean;
    available: number;
}

interface Promo {
    tickets: Ticket[];
}

const usePromo = (slug: string) => {
    const [promo, setPromo] = useState<Promo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                const slug2 = "XQX6t0N1DaXyqMqx399W"
                const response = await fetch(`https://vipass-dev-api.web.app/promos/${slug2}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('Response Error:', response.status, response.statusText);
                    throw new Error('Failed to fetch promo data');
                }

                const data = await response.json();
                if (data?.tickets) {
                    setPromo(data);
                    setTickets(data.tickets);
                }
            } catch (err: any) {
                console.error('Fetch Error:', err);
                setError(err.message);
            }
        };

        fetchPromo();
    }, [slug]);

    return { promo, tickets, error };
};

export default usePromo;
