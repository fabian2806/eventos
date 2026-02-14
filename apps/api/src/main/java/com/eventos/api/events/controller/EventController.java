package com.eventos.api.events.controller;

import com.eventos.api.events.domain.Event;
import com.eventos.api.events.dto.EntryTypeSummaryResponse;
import com.eventos.api.events.dto.EventDetailResponse;
import com.eventos.api.events.dto.EventSummaryResponse;
import com.eventos.api.events.mapper.EntryTypeMapper;
import com.eventos.api.events.mapper.EventMapper;
import com.eventos.api.events.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<EventSummaryResponse> getEvents() {
        return EventMapper.toSummaryResponseList(eventService.listEvents());
    }

    @GetMapping("/{id}")
    public EventDetailResponse getEventById(@PathVariable Long id){
        return EventMapper.toDetailResponse(eventService.getEventById(id));
    }

    @GetMapping("/{eventId}/entry-types")
    public List<EntryTypeSummaryResponse> getEntryTypeByEvent(@PathVariable Long eventId){
        return EntryTypeMapper.toSummaryResponseList(eventService.getEntryTypes(eventId));
    }

}
