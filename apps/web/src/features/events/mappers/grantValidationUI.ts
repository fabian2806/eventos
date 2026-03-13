import type { GrantValidationReason } from "@/api/types";

type ValidationUIConfig = {
    inputVariant: "success" | "error";
    title: string
    description?: string
    showContinue: boolean;
}

export const grantValidationUI: Record<GrantValidationReason, ValidationUIConfig> = {
    VALID: {
        inputVariant: "success",
        title: "Código válido para este evento.",
        showContinue: true
    },
    NOT_FOUND: {
        inputVariant: "error",
        title: "El código no existe.",
        showContinue: false
    },
    USED: {
        inputVariant: "error",
        title: "El código ya fue utilizado.",
        showContinue: false
    },
    EXPIRED: {
        inputVariant: "error",
        title: "El código ha expirado.",
        showContinue: false
    },
    WRONG_EVENT: {
        inputVariant: "error",
        title: "El código no pertenece a este evento.",
        showContinue: false
    }
}