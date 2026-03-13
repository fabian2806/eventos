import { grantsApi } from "@/api/grants";
import type { GrantValidationRequest, GrantValidationResponse } from "@/api/types"
import { useEffect, useState } from "react";

const useGrantValidation = (code: string, idEvent: number) => {
    const [response, setResponse] = useState<GrantValidationResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect( () => {
        let alive = true;

        const payload : GrantValidationRequest = {
            code,
            idEvent
        };

        (async () => {
            try {
                const data = await grantsApi.validate(payload);
                if (alive) setResponse(data);
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


    return [response, loading, error];

}