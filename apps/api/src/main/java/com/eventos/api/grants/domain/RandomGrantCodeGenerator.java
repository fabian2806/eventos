package com.eventos.api.grants.domain;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class RandomGrantCodeGenerator implements GrantCodeGenerator{
    private static final String CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final int LENGTH = 10;
    private final SecureRandom secureRandom = new SecureRandom();

    @Override
    public String generate(){
        StringBuilder code = new StringBuilder();

        for (int i=0; i<LENGTH; i++){
            int index = secureRandom.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(index));
        }


        return code.toString();
    }
}

/**
 * CHARACTERS contiene toda la lista de caracteres válidos (nótese que se excluyen 0, 1, I y O por su parecido visual)
 * LENGTH define la longitud del código
 * StringBuilder para construir caracter a caracter (nótese el for, recorremos uno por uno)
 * secureRandom.nextInt(CHARACTERS.length()) genera un número entre 1 a CHARACTERS.length() - 1
 * code.append(CHARACTERS.charAt(index)) agrega el caracter en la posición index de CHARACTERS a la cadena
 * **/
