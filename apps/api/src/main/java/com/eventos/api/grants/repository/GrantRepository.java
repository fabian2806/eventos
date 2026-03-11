package com.eventos.api.grants.repository;

import com.eventos.api.grants.domain.Grant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrantRepository extends JpaRepository<Grant, Long> {
    
}
