ALTER TABLE grants DROP CONSTRAINT grants_status_check;
ALTER TABLE grants DROP CONSTRAINT grants_source_check;

ALTER TABLE grants
    ADD CONSTRAINT grants_status_check
        CHECK (status IN ('EMITTED','USED','EXPIRED'));

ALTER TABLE grants
    ADD CONSTRAINT grants_source_check
        CHECK (source IN ('PURCHASE','COURTESY','PROMOTER','ADMIN'));