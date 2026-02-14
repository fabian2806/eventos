package com.eventos.api.events.service;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.domain.Event;
import com.eventos.api.events.repository.EntryTypeRepository;
import com.eventos.api.events.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EntryTypeRepository entryTypeRepository;

    public EventService(EventRepository eventRepository, EntryTypeRepository entryTypeRepository) {
        this.eventRepository = eventRepository;
        this.entryTypeRepository = entryTypeRepository;
    }

    public List<Event> listEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));
    }

    public List<EntryType> getEntryTypes(Long id){

        //Validar si existe
        eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));



        //
        return entryTypeRepository.findByEventId(id);

    }

}
