package com.eventos.api.grants.service;

import com.eventos.api.events.domain.EntryType;
import com.eventos.api.events.repository.EntryTypeRepository;
import com.eventos.api.grants.domain.Grant;
import com.eventos.api.grants.domain.GrantCodeGenerator;
import com.eventos.api.grants.domain.GrantFactory;
import com.eventos.api.grants.domain.GrantStatus;
import com.eventos.api.grants.dto.GrantValidationResponse;
import com.eventos.api.grants.repository.GrantRepository;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Objects;

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

    @Getter
    public static class GrantRedeemEvaluation{
        private Grant grant;
        private boolean valid;
        private GrantStatus status;

        public GrantRedeemEvaluation(Grant grant, boolean valid, GrantStatus status){
            this.grant = grant;
            this.valid = valid;
            this.status = status;
        }

    }

    /** Método0 privado para generar un código ÚNICO**/
    private String generateUniqueCode(){
        String code;

        // Ejecuta el bucle hasta que cree un código único en la BD
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
        // Validamos que exista el entryType
        EntryType entryType = entryTypeRepository.findById(entryTypeId)
                .orElseThrow(() -> new RuntimeException("Entry type not found"));

        // Luego, procedemos a generar un código
        String code = generateUniqueCode();

        // Con el entryType existente y el código, creamos el Grant de cortesía
        Grant grant = grantFactory.createFromCourtesy(code, entryType);

        return grantRepository.save(grant);
    }

    /** Único método0 central que retorna un resultado interno de negocio para verificar si un grant es
     * redimible o no. Con esto, nos ahorramos el problema de si retornar boolean, o Grant,
     * o GrantValidationResponse en un único método0. Cada método0 por separado decide cómo responder
     * a partir de este método**/
    /*Nota: Podría hacer un factory. Por cuestiones de simplicidad y casos de uso, no lo haré*/

    private GrantRedeemEvaluation evaluateGrantForRedeem(String code, Long idEvent){
        // Validamos que exista el grant

        System.out.println("El code es:" + code);

        Grant grant = grantRepository.findByCode(code);

        //if (!grantRepository.existsByCode(code)) return
        if (grant == null) return
                new GrantRedeemEvaluation(null, false, null);

        // Validamos que el grant es redimible (status EMMITED y coincide con el idEvent recibido)
        if (!grant.isEmitted() || !Objects.equals(grant.getEntryType().getEvent().getId(), idEvent)) return
                new GrantRedeemEvaluation(grant, false, grant.getStatus());

        // TODO: Considerar fecha
        return new GrantRedeemEvaluation(grant, true, grant.getStatus());
    }

    /** Valida que un grant exista y que su status sea EMITTED. Retorna true/false **/
    public boolean isValidGrantForRedeem(String code, Long idEvent){
        GrantRedeemEvaluation grantRedeemEvaluation = evaluateGrantForRedeem(code, idEvent);

        return grantRedeemEvaluation.isValid();
    }

    /** Transforma un resultado de validación para ser utilizado por el controller**/
    public GrantRedeemEvaluation validateGrantCode(String code, Long idEvent){
        GrantRedeemEvaluation grantRedeemEvaluation = evaluateGrantForRedeem(code, idEvent);

        return grantRedeemEvaluation;
    }




}
