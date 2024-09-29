CREATE DATABASE CitrusCloud;
USE CitrusCloud;

-- Tabela Agrotóxico
CREATE TABLE Agrotoxico (
    idAgrotoxico INT PRIMARY KEY,
    Nome VARCHAR(45),
    Descricao VARCHAR(45),
    Preco VARCHAR(45),
    Tipo VARCHAR(45),
    minTemperatura INT,
    maxTemperatura INT,
    minSemChuva INT,
    maxSemChuva INT
);

-- Tabela Pragas
CREATE TABLE Pragas (
    idPragas INT PRIMARY KEY,
    Nome VARCHAR(45),
    Descricao VARCHAR(100),
    Sintomas VARCHAR(100),
    Controle VARCHAR(45),
    tipoAgrotoxicoRecomendado VARCHAR(45),
    condicoesFavoraveis VARCHAR(45)
);

-- Tabela Combatentes (Relacionamento entre Agrotóxicos e Pragas)
CREATE TABLE Combatentes (
    idPragas INT,
    idAgrotoxicos INT,
    FOREIGN KEY (idPragas) REFERENCES Pragas(idPragas),
    FOREIGN KEY (idAgrotoxicos) REFERENCES Agrotoxico(idAgrotoxico)
);

-- Tabela Plantacao
CREATE TABLE Plantacao (
    idPlantacao INT PRIMARY KEY,
    tipoLaranja VARCHAR(45),
    ultimaPulverizacao DATE,
    proxPulverizacao DATE,
    dtColheita DATE,
    idFazenda INT,
    FOREIGN KEY (idFazenda) REFERENCES Fazenda(idFazenda)
);

-- Tabela Fazenda
CREATE TABLE Fazenda (
    idFazenda INT PRIMARY KEY,
    tamanhoHa INT,
    Lotes INT,
    Responsavel VARCHAR(45),
    idEndereco INT,
    idEmpresa INT,
    FOREIGN KEY (idEndereco) REFERENCES Endereco(idEndereco),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Empresa
CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY,
    Nome VARCHAR(45),
    cnpj VARCHAR(14),
    idEndereco INT,
    FOREIGN KEY (idEndereco) REFERENCES Endereco(idEndereco)
);

-- Tabela Funcionarios
CREATE TABLE Funcionarios (
    idUsuario INT PRIMARY KEY,
    NomeCompleto VARCHAR(60),
    cpf VARCHAR(11),
    email VARCHAR(256),
    Senha VARCHAR(70),
    Cargo VARCHAR(45),
    Funcao VARCHAR(45),
    idEmpresa INT,
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Telefone (Relacionamento com Fazenda e Empresa)
CREATE TABLE Telefone (
    idTelefone INT PRIMARY KEY,
    ddd CHAR(2),
    prefixo CHAR(5),
    sufixo CHAR(4),
    idFazenda INT,
    idEmpresa INT,
    FOREIGN KEY (idFazenda) REFERENCES Fazenda(idFazenda),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Endereco
CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY,
    cep CHAR(9),
    Numero VARCHAR(10),
    Logradouro VARCHAR(45),
    Bairro VARCHAR(45),
    Estado VARCHAR(45),
    Cidade VARCHAR(45),
    Complemento VARCHAR(45)
);

