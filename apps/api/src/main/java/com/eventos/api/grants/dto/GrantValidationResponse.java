package com.eventos.api.grants.dto;

import com.eventos.api.grants.domain.GrantStatus;
import com.eventos.api.grants.domain.GrantValidationReason;

public record GrantValidationResponse(
        boolean valid,
        GrantValidationReason reason
) {
}
