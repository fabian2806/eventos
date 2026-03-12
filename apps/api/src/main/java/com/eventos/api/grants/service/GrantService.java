package com.eventos.api.grants.service;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.repository.EntryTypeRepository;
import com.eventos.api.grants.domain.Grant;
import com.eventos.api.grants.domain.GrantCodeGenerator;
import com.eventos.api.grants.domain.GrantFactory;
import com.eventos.api.grants.repository.GrantRepository;
import org.springframework.stereotype.Service;

@Service
public class GrantService {

    private final GrantRepository grantRepository;
    private final GrantFactory grantFactory;
    private final GrantCodeGenerator grantCodeGenerator;
    private final EntryTypeRepository entryTypeRepository;

    public GrantService(GrantRepository grantRepository, GrantFactory grantFactory, GrantCodeGenerator grantCodeGenerator, EntryTypeRepository entryTypeRepository){
        this.grantRepository = grantRepository;
        this.grantFactory = grantFactory;
        this.grantCodeGenerator = grantCodeGenerator;
        this.entryTypeRepository = entryTypeRepository;
    }

    /** Método0 privado para generar un código ÚNICO**/
    private String generateUniqueCode(){
        String code;

        /// Ejecuta el bucle hasta que cree un código único en la BD
        do {
            code = grantCodeGenerator.generate();
        }
        while (grantRepository.existsByCode(code));

        return code;
    }

    /** Para una compra, primero se confirma el pago, es un TODO **/
    public Grant emitPurchaseGrant(){
        return null;
    }

    /** Emite un grant de cortesía **/
    public Grant emitCourtesyGrant(Long entryTypeId){
        /// Validamos que exista el entryType
        EntryType entryType = entryTypeRepository.findById(entryTypeId)
                .orElseThrow(() -> new RuntimeException("Entry type not found"));

        /// Luego, procedemos a generar un código
        String code = generateUniqueCode();

        /// Con el entryType existente y el código, creamos el Grant de cortesía
        Grant grant = grantFactory.createFromCourtesy(code, entryType);

        return grantRepository.save(grant);
    }



}
