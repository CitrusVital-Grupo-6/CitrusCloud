CREATE DATABASE CitrusCloud;
USE CitrusCloud;

-- Tabela Endereco
CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY,
    cep CHAR(9),
    numero VARCHAR(10),
    logradouro VARCHAR(45),
    complemento VARCHAR(45)
);

-- Tabela Empresa
CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY,
    nome VARCHAR(45),
    cnpj VARCHAR(14),
    fkEndereco INT,
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

-- Tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nomeCompleto VARCHAR(60),
    cpf VARCHAR(11),
    email VARCHAR(256),
    senha VARCHAR(70),
    funcao VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Fazenda
CREATE TABLE Fazenda (
    idFazenda INT PRIMARY KEY,
    responsavel VARCHAR(45),
    fkEndereco INT,
    fkEmpresa INT,
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Telefone (Relacionamento com Fazenda e Empresa)
CREATE TABLE Telefone (
    idTelefone INT PRIMARY KEY,
    ddd CHAR(2),
    prefixo CHAR(5),
    sufixo CHAR(4),
    fkFazenda INT,
    fkEmpresa INT,
    FOREIGN KEY (fkFazenda) REFERENCES Fazenda(idFazenda),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Plantacao
CREATE TABLE Talhao (
    idTalhao INT PRIMARY KEY,
    tipoLaranja VARCHAR(45),
    tamanhoHec VARCHAR(45),
    fkFazenda INT,
    FOREIGN KEY (fkFazenda) REFERENCES Fazenda(idFazenda)
);

-- Tabela Agrotóxico
CREATE TABLE Agrotoxico (
    idAgrotoxico INT PRIMARY KEY,
    nome VARCHAR(45),
    descricao VARCHAR(45),
    tipo VARCHAR(45),
    minTemperatura INT,
    maxTemperatura INT,
    minSemChuva INT,
    maxSemChuva INT,
    qtdML DECIMAL
);

-- Tabela Cronograma (Relacionamento entre Agrotóxicos e Plantação)
CREATE TABLE Pulverizacao (
	idPulverizacao INT PRIMARY KEY,
    fkTalhao INT,
    fkAgrotoxico INT,
    dataPulverizacao DATE,
    FOREIGN KEY (fkTalhao) REFERENCES Talhao(idTalhao),
    FOREIGN KEY (fkAgrotoxico) REFERENCES Agrotoxico(idAgrotoxico)
);

-- Tabela Pragas
CREATE TABLE Pragas (
    idPragas INT PRIMARY KEY,
    nome VARCHAR(45),
    descricao VARCHAR(100),
    controle VARCHAR(45),
    condicoesFavoraveis VARCHAR(45)
);