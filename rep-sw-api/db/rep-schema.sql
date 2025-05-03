CREATE TABLE departamento
(
    id_departamento SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    dt_criacao DATE NOT NULL
)

CREATE TABLE jornada
(
    id_jornada SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    horario_entrada TIME NOT NULL,
    intervalo_inicio TIME NOT NULL,
    intervalo_fim TIME NOT NULL,
    horario_saida TIME NOT NULL,
    dias_trabalho TEXT[] NOT NULL -- Exemplo: ARRAY['Segunda', 'Terça']
)

CREATE TABLE usuario 
(
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    situacao ENUM('Ativo', 'Inativo', 'Férias', 'Afatado') NOT NULL,
    telefone VARCHAR(15) NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    dt_criacao DATE NOT NULL,
    dt_atualizacao DATE NOT NULL,
    FOREIGN KEY (id_departamento) REFERENCES departamento(id_departamento) ON DELETE CASCADE,
    FOREIGN KEY (id_jornada) REFERENCES jornada(id_jornada) ON DELETE CASCADE
)

