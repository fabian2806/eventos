// src/api/types.ts

//TODO: Considera tener types por features

/* EVENTOS */
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

/* GRANTS */

export type GrantSource =
  | "PURCHASE"
  | "COURTESY"
  | "PROMOTER"
  | "ADMIN";

export type GrantStatus =
  | "EMITTED"
  | "REDEEMED"
  | "EXPIRED";


export type EmmitGrantSummaryResponse = {
    id: number;
    code: string;
    source: GrantSource;
    status: GrantStatus;
}

export type GrantValidationRequest = {
    code: string;
    idEvent: string;
}

export type GrantValidationResponse = {
    valid: boolean;
    status: GrantStatus;
}