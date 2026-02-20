import { eventsApi } from "@/api/events";
import type { EntryTypeSummaryResponse } from "@/api/types";
import { useEffect, useState } from "react";

const useEntryTypesEvent = (eventId: number) => {
    const [entryTypes, setEntryTypes] = useState<EntryTypeSummaryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                console.log("Event id en hook:", eventId);
                const data = await eventsApi.entryTypes(eventId);
                if (alive) setEntryTypes(data);
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

    return {entryTypes, loading, error};
}

export default useEntryTypesEvent;