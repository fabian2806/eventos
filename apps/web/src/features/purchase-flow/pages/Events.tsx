import { eventsApi } from "@/api/events";
import type { EventSummaryResponse } from "@/api/types";
import { useEffect, useState } from "react";

const Events = () => {
    
    const [events, setEvents] = useState<EventSummaryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
        let alive = true;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await eventsApi.list();
                if (alive) setEvents(data);
            }
            catch(e){
                if (alive) setError(e instanceof Error ? e.message : "Error desconocido");
            }
            finally{
                if (alive) setLoading(false);
            }
        })();

        return () => {
            alive = false;
        };

    }, []);

    if (loading) return <div className="text-white">Cargando…</div>;
    if (error) return <div className="text-red-300">Error: {error}</div>;
    
    return (
        <section>
            {events.map((ev) => (
                <div className="text-white">
                    <p>{ev.id}</p>
                    <p>{ev.name}</p>
                    <p>{ev.address}</p>
                    <p>{ev.startsAt}</p>
                    <p>{ev.endsAt}</p>
                </div>
            ))}
        </section>
    );
}

export default Events;