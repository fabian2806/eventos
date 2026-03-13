// src/api/events.ts

//import { http } from "@/api/http";
import type { EventSummaryResponse, EntryTypeSummaryResponse, EventDetailResponse } from "@/api/types";
import { apiClient } from "./apiClient";

export const eventsApi = {
    list: () => apiClient.get<EventSummaryResponse[]>("/events"),
    get: (id: number) => apiClient.get<EventDetailResponse>(`events/${id}`),
    entryTypes: (eventId: number) => apiClient.get<EntryTypeSummaryResponse[]>(`events/${eventId}/entry-types`)
}

/*export const eventsApi = {
    list: () => http<EventSummaryResponse[]>("/events"),
    get: (id: number) => http<EventDetailResponse>(`events/${id}`),
    entryTypes: (eventId: number) => http<EntryTypeSummaryResponse[]>(`events/${eventId}/entry-types`),
}*/