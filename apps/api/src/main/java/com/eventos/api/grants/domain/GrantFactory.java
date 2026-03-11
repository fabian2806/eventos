package com.eventos.api.grants.domain;


import com.eventos.api.events.domain.EntryType;
import org.springframework.stereotype.Component;

@Component
public class GrantFactory {

    public Grant createFromPurchase(String code, EntryType entryType){
        return new Grant(
                code,
                GrantStatus.EMITIDO,
                GrantSource.COMPRA,
                entryType);
    }

    public Grant createFromCourtesy(String code, EntryType entryType){
        return new Grant(
                code,
                GrantStatus.EMITIDO,
                GrantSource.CORTESIA,
                entryType);
    }

    public Grant createFromPromoter(String code, EntryType entryType){
        return new Grant(
                code,
                GrantStatus.EMITIDO,
                GrantSource.PROMOTOR,
                entryType);
    }

    public Grant createFromAdmin(String code, EntryType entryType){
        return new Grant(
                code,
                GrantStatus.EMITIDO,
                GrantSource.ADMIN,
                entryType);
    }

}
