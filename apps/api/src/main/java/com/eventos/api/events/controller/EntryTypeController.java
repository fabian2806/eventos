package com.eventos.api.events.controller;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.dto.EntryTypeSummaryResponse;
import com.eventos.api.events.mapper.EntryTypeMapper;
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
    public List<EntryTypeSummaryResponse> getEntryTypes() {
        return EntryTypeMapper.toSummaryResponseList(entryTypeService.listEntryTypes());
    }

    @GetMapping("/{id}")
    public EntryTypeSummaryResponse getEntryTypeById(@PathVariable Long id) {
        return EntryTypeMapper.toSummaryResponse(entryTypeService.getEntryTypeById(id));
    }


}
