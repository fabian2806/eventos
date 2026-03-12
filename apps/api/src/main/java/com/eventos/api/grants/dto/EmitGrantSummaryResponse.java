package com.eventos.api.grants.dto;

import com.eventos.api.grants.domain.GrantSource;
import com.eventos.api.grants.domain.GrantStatus;

public record EmitGrantSummaryResponse(
        Long id,
        String code,
        GrantSource source,
        GrantStatus status
) {
}
