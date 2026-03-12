package com.eventos.api.grants.repository;

import com.eventos.api.grants.domain.Grant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrantRepository extends JpaRepository<Grant, Long> {
    boolean existsByCode(String code);
    //Optional<Grant> findByCode(String code);
    Grant findByCode(String code);
}
