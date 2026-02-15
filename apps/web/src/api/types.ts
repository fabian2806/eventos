// src/api/types.ts

export type EventSummaryResponse = {
    id: number;
    name: string;
    address: string;
    startsAt: string;
    endsAt: string | null;
};

export type EventDetailResponse = {
    id: number;
    name: string;
    description: string;
    address: string;
    startsAt: Date;
    endsAt: Date | null;
}

export type EntryTypeSummaryResponse = {
    id: number;
    name: string;
    price: number | string; //Podría ser string por el serializador (BigDecimal en backend)
    stock: number;
}