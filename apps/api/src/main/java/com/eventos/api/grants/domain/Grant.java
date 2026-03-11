package com.eventos.api.grants.domain;

import com.eventos.api.events.domain.EntryType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name = "grants")
public class Grant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Id
    @Column(nullable = false, unique = true)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GrantStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GrantSource source;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entry_type_id", nullable = false)
    private EntryType entryType;

    protected Grant() {}

    Grant(String code, GrantStatus status, GrantSource source, EntryType entryType){
        this.code = code;
        this.status = status;
        this.source = source;
        this.entryType = entryType;
    }
}
