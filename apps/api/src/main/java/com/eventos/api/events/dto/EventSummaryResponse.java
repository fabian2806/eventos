package com.eventos.api.events.dto;

import java.time.LocalDateTime;

public record EventSummaryResponse(
        Long id,
        String name,
        String address,
        LocalDateTime startsAt,
        LocalDateTime endsAt) {
}