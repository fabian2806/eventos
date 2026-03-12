package com.eventos.api.grants.dto;

import com.eventos.api.grants.domain.GrantStatus;

public record GrantValidationResponse(
        boolean valid,
        GrantStatus status
) {
}
