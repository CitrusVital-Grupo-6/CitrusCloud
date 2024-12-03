CREATE DATABASE IF NOT EXISTS CitrusCloud;
USE CitrusCloud;

-- drop database citruscloud;

-- Tabela Endereco
CREATE TABLE IF NOT EXISTS Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(9),
    numero VARCHAR(10),
    complemento VARCHAR(45)
);

-- Tabela Empresa
CREATE TABLE IF NOT EXISTS Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    cnpj VARCHAR(14),
    fkEndereco INT,
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

-- Tabela Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(60),
    cpf VARCHAR(11),
    email VARCHAR(256),
    senha VARCHAR(70),
    funcao VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Fazenda
CREATE TABLE IF NOT EXISTS Fazenda (
    idFazenda INT PRIMARY KEY AUTO_INCREMENT,
    nomeFazenda VARCHAR(45),
    fkEndereco INT,
    fkEmpresa INT,
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Telefone (Relacionamento com Fazenda e Empresa)
CREATE TABLE IF NOT EXISTS Telefone (
    idTelefone INT PRIMARY KEY AUTO_INCREMENT,
    ddd CHAR(2),
    prefixo CHAR(5),
    sufixo CHAR(4),
    fkFazenda INT,
    fkEmpresa INT,
    FOREIGN KEY (fkFazenda) REFERENCES Fazenda(idFazenda),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Plantacao
CREATE TABLE IF NOT EXISTS Talhao (
    idTalhao INT PRIMARY KEY AUTO_INCREMENT,
    nomeTalhao VARCHAR(45),
    tipoLaranja VARCHAR(45),
    tamanhoHec VARCHAR(45),
    fkFazenda INT,
    FOREIGN KEY (fkFazenda) REFERENCES Fazenda(idFazenda)
);

-- Tabela Agrotóxico
CREATE TABLE IF NOT EXISTS Agrotoxico (
    idAgrotoxico INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    descricao VARCHAR(45),
    tipo VARCHAR(45),
    minTemperatura INT,
    maxTemperatura INT,
    minSemChuva INT,
    maxSemChuva INT,
    qtdML DECIMAL,
    precoPorLitro DECIMAL(5,2)
);

-- Tabela Cronograma (Relacionamento entre Agrotóxicos e Plantação)
CREATE TABLE IF NOT EXISTS Pulverizacao (
	idPulverizacao INT PRIMARY KEY AUTO_INCREMENT,
    fkTalhao INT,
    fkAgrotoxico INT,
    qtdML INT,
    dataPulverizacao DATE,
    FOREIGN KEY (fkTalhao) REFERENCES Talhao(idTalhao),
    FOREIGN KEY (fkAgrotoxico) REFERENCES Agrotoxico(idAgrotoxico)
);

-- Tabela Pragas
CREATE TABLE IF NOT EXISTS Praga (
    idPraga INT PRIMARY KEY AUTO_INCREMENT,
    nomePraga VARCHAR(45),
    climaFavoravel VARCHAR(255),
    periodoRisco VARCHAR(255),
    fatoresAdicionais VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Controle (
	idControle INT PRIMARY KEY AUTO_INCREMENT,
    fkAgrotoxicoControle INT,
    fkPragaControle INT,
    FOREIGN KEY (fkAgrotoxicoControle) REFERENCES Agrotoxico(idAgrotoxico),
    FOREIGN KEY (fkPragaControle) REFERENCES Praga(idPraga)
);

CREATE TABLE IF NOT EXISTS Mensagem (
	idMensagem INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    assunto VARCHAR(100),
    conteudo VARCHAR(255)
);