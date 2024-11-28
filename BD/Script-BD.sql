CREATE DATABASE CitrusCloud;
USE CitrusCloud;

-- Tabela Endereco
CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY,
    cep CHAR(9),
    numero VARCHAR(10),
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
    nome VARCHAR(45),
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
    qtdML DECIMAL,
    precoPorLitro DECIMAL(5,2)
);

-- Tabela Cronograma (Relacionamento entre Agrotóxicos e Plantação)
CREATE TABLE Pulverizacao (
	idPulverizacao INT PRIMARY KEY,
    fkTalhao INT,
    fkAgrotoxico INT,
    qtdML INT,
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

-- Limpando os dados das tabelas, se necessário

select * from Endereco;

-- Inserindo dados em Endereco
INSERT INTO Endereco (idEndereco, cep, numero, logradouro, complemento) VALUES
(1, '12345-678', '100', 'Rua Laranja', 'Apt 101'),
(2, '98765-432', '200', 'Av. Citrus', NULL);

-- Inserindo dados em Fazenda
INSERT INTO Fazenda (idFazenda, responsavel, fkEndereco, fkEmpresa) VALUES
(1, 'João Silva', 1, NULL),
(2, 'Maria Oliveira', 2, NULL);

-- Inserindo dados em Talhao
INSERT INTO Talhao (idTalhao, tipoLaranja, tamanhoHec, fkFazenda) VALUES
(1, 'Pera', '5.0', 1),
(2, 'Valência', '3.5', 1),
(3, 'Lima', '2.0', 2);

-- Inserindo dados em Agrotoxico
INSERT INTO Agrotoxico (idAgrotoxico, nome, descricao, tipo, minTemperatura, maxTemperatura, minSemChuva, maxSemChuva, valorLitro) VALUES
(1, 'AgroX', 'Controle de fungos', 'Fungicida', 15, 30, 1, 3, 50.00),
(2, 'InsectoKill', 'Controle de insetos', 'Inseticida', 18, 35, 2, 5, 70.00),
(3, 'WeedAway', 'Controle de ervas daninhas', 'Herbicida', 20, 28, 0, 2, 45.00);

-- Inserindo dados em Pulverizacao
INSERT INTO Pulverizacao (idPulverizacao, fkTalhao, fkAgrotoxico, qtdML, dataPulverizacao) VALUES
(1, 1, 1, 500, '2024-01-15'),
(2, 1, 2, 300, '2024-02-20'),
(3, 2, 1, 700, '2024-02-25'),
(4, 3, 3, 450, '2024-03-10'),
(5, 3, 2, 600, '2024-03-15'),
(6, 2, 1, 400, '2024-04-05');

SET lc_time_names = 'pt_BR';

SELECT 
    MONTHNAME(p.dataPulverizacao) AS mes,
    IFNULL(SUM(p.qtdML), 0) AS total_ml
FROM 
    Pulverizacao p
INNER JOIN 
    Talhao t ON p.fkTalhao = t.idTalhao
INNER JOIN 
    Fazenda f ON t.fkFazenda = f.idFazenda
WHERE 
    f.idFazenda = 1 -- Substitua pelo ID da fazenda desejada
GROUP BY 
    p.fkAgrotoxico
ORDER BY 
    MONTH(p.dataPulverizacao);