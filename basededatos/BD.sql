CREATE DATABASE tusnotitas;

USE tusnotitas;

SHOW TABLES;

CREATE TABLE usuarios (
    id INT(10) NOT NULL,
    nombrecom VARCHAR(60) NOT NULL,
    nombreusu VARCHAR(15) NOT NULL,
    password VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
ADD PRIMARY KEY (id);

ALTER TABLE usuarios
MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE usuarios;

CREATE TABLE notas (
    id INT(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    nota TEXT,
    user_id INT(10),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuarios(id),
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE notas
ADD PRIMARY KEY (id);

ALTER TABLE notas   
MODIFY id INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE notas;

