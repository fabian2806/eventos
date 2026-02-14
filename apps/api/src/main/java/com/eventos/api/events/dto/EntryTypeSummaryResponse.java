package com.eventos.api.events.dto;

import java.math.BigDecimal;

public record EntryTypeSummaryResponse(
        Long id,
        String name,
        BigDecimal price,
        int stock
) {
}
