package com.eventos.api.grants.mapper;

import com.eventos.api.grants.domain.Grant;
import com.eventos.api.grants.dto.EmitGrantSummaryResponse;
import com.eventos.api.grants.dto.GrantValidationResponse;
import com.eventos.api.grants.service.GrantService;

public final class GrantMapper {

    private GrantMapper(){}

    public static EmitGrantSummaryResponse toSummaryResponse(final Grant grant){
        if (grant == null) return null;

        return new EmitGrantSummaryResponse(
                grant.getId(),
                grant.getCode(),
                grant.getSource(),
                grant.getStatus()
        );
    }

    public static GrantValidationResponse toValidationResponse(final GrantService.GrantRedeemEvaluation grantRedeemEvaluation){
        if  (grantRedeemEvaluation == null) return null;

        return new GrantValidationResponse(
                grantRedeemEvaluation.isValid(),
                grantRedeemEvaluation.getReason());
    }

}
