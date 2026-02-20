import { eventsApi } from "@/api/events";
import type { EventDetailResponse } from "@/api/types";
import { useEffect, useState } from "react";

const useEvent = (eventId: number) => {
    const [event, setEvent] = useState<EventDetailResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                const data = await eventsApi.get(eventId);
                if (alive) setEvent(data);
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

    return {event, loading, error};
}

export default useEvent;