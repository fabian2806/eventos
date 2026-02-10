package com.eventos.api.events.service;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.repository.EntryTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntryTypeService {

    private final EntryTypeRepository entryTypeRepository;

    public EntryTypeService(EntryTypeRepository entryTypeRepository) {
        this.entryTypeRepository = entryTypeRepository;
    }

    public List<EntryType> listEntryTypes() {
        return entryTypeRepository.findAll();
    }

    public EntryType getEntryTypeById(Long id) {
        return entryTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));
    }

}
