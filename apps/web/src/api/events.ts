// src/api/events.ts

import { http } from "./http";
import type { EventSummaryResponse, EntryTypeSummaryResponse, EventDetailResponse } from "./types";

export const eventsApi = {
    list: () => http<EventSummaryResponse[]>("/events"),
    get: (id: number) => http<EventDetailResponse>(`events/${id}`),
    entryTypes: (eventId: number) => http<EntryTypeSummaryResponse[]>(`events/${eventId}/entry-types`),
}