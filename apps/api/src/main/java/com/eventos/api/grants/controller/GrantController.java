package com.eventos.api.grants.controller;

import com.eventos.api.grants.domain.Grant;
import com.eventos.api.grants.dto.EmitGrantSummaryResponse;
import com.eventos.api.grants.mapper.GrantMapper;
import com.eventos.api.grants.service.GrantService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/grants")
public class GrantController {

    private final GrantService grantService;

    public GrantController(GrantService grantService){
        this.grantService = grantService;
    }

    @PostMapping("/courtesy/{entryTypeId}")
    public EmitGrantSummaryResponse emitCourtesyGrant(@PathVariable Long entryTypeId){

        return GrantMapper.toSummaryResponse(grantService.emitCourtesyGrant(entryTypeId));
    }

}
