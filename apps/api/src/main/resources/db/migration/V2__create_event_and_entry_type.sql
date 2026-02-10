CREATE TABLE event(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP
);

CREATE TABLE entry_type(
    id BIGSERIAL PRIMARY KEY,
    price NUMERIC(10,2) NOT NULL,
    name VARCHAR(30) NOT NULL,
    description TEXT,
    stock INT NOT NULL,
    is_box BOOLEAN NOT NULL,
    event_id BIGINT NULL,
    capacity INT,
    /*Constraint-PK*/
    CONSTRAINT fk_entry_type_event FOREIGN KEY (event_id) REFERENCES event(id),
    /*Constraint-Nombre único por tipo de entrada*/
    CONSTRAINT uq_entry_type_event_name UNIQUE (event_id, name)
);