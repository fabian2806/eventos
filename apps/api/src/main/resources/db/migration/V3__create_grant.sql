CREATE TABLE grants(
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('EMITIDO','USADO','EXPIRADO')),
    source VARCHAR(20) NOT NULL CHECK (source IN ('COMPRA','CORTESIA','PROMOTOR','ADMIN')),
    entry_type_id BIGINT NOT NULL,
    /*Constraint-PK*/
    CONSTRAINT fk_grant_entry_type FOREIGN KEY (entry_type_id) REFERENCES entry_type(id)
);