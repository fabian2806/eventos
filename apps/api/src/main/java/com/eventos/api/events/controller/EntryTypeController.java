package com.eventos.api.events.controller;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.service.EntryTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("entryType")
public class EntryTypeController {

    private final EntryTypeService entryTypeService;

    public EntryTypeController(EntryTypeService entryTypeService) {
        this.entryTypeService = entryTypeService;
    }

    @GetMapping
    public List<EntryType> getEntryTypes() {
        return entryTypeService.listEntryTypes();
    }

    @GetMapping("/{id}")
    public EntryType getEntryTypeById(@PathVariable Long id) {
        return entryTypeService.getEntryTypeById(id);
    }

}
