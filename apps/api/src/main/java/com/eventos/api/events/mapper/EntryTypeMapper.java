package com.eventos.api.events.mapper;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.dto.EntryTypeSummaryResponse;

import java.util.List;

public final class EntryTypeMapper {
    private EntryTypeMapper() {}

    public static EntryTypeSummaryResponse toSummaryResponse (final EntryType entryType) {
        if (entryType == null) return null;

        return new EntryTypeSummaryResponse(
                entryType.getId(),
                entryType.getName(),
                entryType.getPrice(),
                entryType.getStock()
        );
    }

    public static List<EntryTypeSummaryResponse> toSummaryResponseList (final List<EntryType> entryTypes) {
        if (entryTypes == null) return List.of();

        return entryTypes.stream().map(EntryTypeMapper::toSummaryResponse).toList();

    }

}
