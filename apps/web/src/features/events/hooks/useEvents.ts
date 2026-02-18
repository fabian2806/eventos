import { eventsApi } from "@/api/events";
import type { EventSummaryResponse } from "@/api/types";
import { useEffect, useState } from "react"

const useEvents = () => {
    const [events, setEvents] = useState<EventSummaryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
        let alive = true;

        (async () => {
            try {
                const data = await eventsApi.list();
                if (alive) setEvents(data);
            } catch (e) {
                if (alive) setError(e instanceof Error ? e.message : "Error");
            }
            finally{
                setLoading(false);
            }
        })();

        return () => {
            alive = false;
        };
    }, []);

    return {events, loading, error};
}

export default useEvents;