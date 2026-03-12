package com.eventos.api.grants.mapper;

import com.eventos.api.grants.domain.Grant;
import com.eventos.api.grants.dto.EmitGrantSummaryResponse;

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

}
