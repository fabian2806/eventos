import { apiClient } from "./apiClient";
import type { EmmitGrantSummaryResponse, GrantValidationRequest, GrantValidationResponse } from "./types";

export const grantsApi = {
    emitCourtesy: (entryTypeId: number) => apiClient.post<EmmitGrantSummaryResponse>(
        `/grants/courtesy/${entryTypeId}`
    ),

    validate: (payload: GrantValidationRequest) => apiClient.post<GrantValidationResponse, GrantValidationRequest>(
        "grants/validate",
        payload
    ),
}