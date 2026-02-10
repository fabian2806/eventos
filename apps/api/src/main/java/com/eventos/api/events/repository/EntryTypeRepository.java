package com.eventos.api.events.repository;

import com.eventos.api.events.domain.EntryType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryTypeRepository extends JpaRepository<EntryType, Long> {
}
