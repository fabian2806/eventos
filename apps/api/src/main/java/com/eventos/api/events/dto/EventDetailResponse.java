package com.eventos.api.events.dto;

import java.time.LocalDateTime;

public record EventDetailResponse(
        Long id,
        String name,
        String description,
        String address,
        LocalDateTime startsAt,
        LocalDateTime endsAt
) {
}
