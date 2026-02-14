package com.eventos.api.events.mapper;

import com.eventos.api.events.domain.Event;
import com.eventos.api.events.dto.EventDetailResponse;
import com.eventos.api.events.dto.EventSummaryResponse;

import java.util.List;

public final class EventMapper {

    private EventMapper() {}

    public static EventSummaryResponse toSummaryResponse(final Event event) {
        if (event == null) return null;

        return new EventSummaryResponse(
                event.getId(),
                event.getName(),
                event.getAddress(),
                event.getStartsAt(),
                event.getEndsAt()
        );
    }

    public static EventDetailResponse toDetailResponse(final Event event) {
        if (event == null) return null;

        return new EventDetailResponse(
                event.getId(),
                event.getName(),
                event.getDescription(),
                event.getAddress(),
                event.getStartsAt(),
                event.getEndsAt()
        );

    }

    public static List<EventSummaryResponse> toSummaryResponseList(final List<Event> events) {
        if (events == null) return List.of();

        return events.stream().map(EventMapper::toSummaryResponse).toList();
    }

}
