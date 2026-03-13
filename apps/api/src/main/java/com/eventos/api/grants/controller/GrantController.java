package com.eventos.api.grants.controller;

import com.eventos.api.grants.domain.Grant;
import com.eventos.api.grants.dto.EmitGrantSummaryResponse;
import com.eventos.api.grants.dto.GrantValidationRequest;
import com.eventos.api.grants.dto.GrantValidationResponse;
import com.eventos.api.grants.mapper.GrantMapper;
import com.eventos.api.grants.service.GrantService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/validate")
    public GrantValidationResponse validateGrant(@RequestBody GrantValidationRequest grantValidationRequest){
        return GrantMapper.toValidationResponse(grantService.validateGrantCode(
                grantValidationRequest.code(),
                grantValidationRequest.idEvent()));
    }

}
