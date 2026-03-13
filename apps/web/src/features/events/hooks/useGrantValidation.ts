import { grantsApi } from "@/api/grants";
import type { GrantValidationRequest, GrantValidationResponse } from "@/api/types"
import { useState } from "react";

const useGrantValidation = () => {
    const [response, setResponse] = useState<GrantValidationResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateGrant = async (code: string, idEvent: number) => {
        setLoading(true);
        setError(null);

        const payload : GrantValidationRequest = {
            code,
            idEvent,
        };

        try {
            const data = await grantsApi.validate(payload);
            setResponse(data);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Error";
            setError(message);
            throw e;
        }
        finally {
            setLoading(false);
        }
    };


    return {validateGrant, response, loading, error};
}

export default useGrantValidation;