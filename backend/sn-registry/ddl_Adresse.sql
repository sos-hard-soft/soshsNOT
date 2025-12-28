CREATE TABLE adresse
(
    id          UUID         NOT NULL,
    adresse     VARCHAR(255) NOT NULL,
    ville       VARCHAR(255),
    pays        VARCHAR(255),
    code_postal INTEGER,
    principal   BOOLEAN,
    CONSTRAINT pk_adresse PRIMARY KEY (id)
);