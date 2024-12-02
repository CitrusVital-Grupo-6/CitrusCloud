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
CREATE TABLE IF NOT EXISTS Pragas (
    idPragas INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    descricao VARCHAR(100),
    controle VARCHAR(45),
    condicoesFavoraveis VARCHAR(45)
);

-- Inserindo dados em Endereco
INSERT INTO Endereco (cep, numero, complemento) VALUES
	('12345-678', '100', 'Apt 101'),
	('98765-432', '200', NULL),
	('23935010', '1168', NULL);

INSERT INTO Empresa (nome, cnpj, fkEndereco) VALUES
    ('Empresa Exemplo A', '12345678000101', 1),
    ('Empresa Exemplo B', '98765432000199', 2);

INSERT INTO Usuario (nomeCompleto, cpf, email, senha, funcao, fkEmpresa) VALUES
    ('Carlos Silva', '12345678901', 'carlos.silva@empresa.com', 'senha123', 'Gerente', 1),
    ('Ana Santos', '23456789012', 'ana.santos@empresa.com', 'senha456', 'Analista', 1),
    ('João Oliveira', '34567890123', 'joao.oliveira@empresa.com', 'senha789', 'Desenvolvedor', 1);

INSERT INTO Fazenda (responsavel, fkEndereco, fkEmpresa) VALUES
	('João Silva', 1, NULL),
	('Maria Oliveira', 2, NULL);

INSERT INTO Fazenda (nomeFazenda, fkEndereco, fkEmpresa) VALUES
	('Fazenda Lima 1', 3, NULL),
	('Fazenda Lima 2', 3, NULL);

INSERT INTO Talhao (nomeTalhao, tipoLaranja, tamanhoHec, fkFazenda) VALUES
	('Talhão Norte', 'Pera', '5.0', 1),
	('Talhão Sul', 'Valência', '3.5', 1),
	('Talhão Oeste', 'Lima', '2.0', 2);

INSERT INTO Agrotoxico (nome, descricao, tipo, minTemperatura, maxTemperatura, minSemChuva, maxSemChuva, precoPorLitro) VALUES
	('AgroX', 'Controle de fungos', 'Fungicida', 15, 30, 1, 3, 50.00),
	('InsectoKill', 'Controle de insetos', 'Inseticida', 18, 35, 2, 5, 70.00),
	('WeedAway', 'Controle de ervas daninhas', 'Herbicida', 20, 28, 0, 2, 45.00);

INSERT INTO Pulverizacao (fkTalhao, fkAgrotoxico, qtdML, dataPulverizacao) VALUES 
	(1, 1, 500, CURDATE()),             -- Hoje
	(1, 1, 600, DATE_ADD(CURDATE(), INTERVAL 2 DAY)), -- Dentro de 5 dias
	(2, 3, 700, DATE_ADD(CURDATE(), INTERVAL 4 DAY)), -- Dentro de 5 dias
	(3, 2, 800, DATE_ADD(CURDATE(), INTERVAL 6 DAY)), -- Fora do intervalo
	(3, 2, 900, DATE_ADD(CURDATE(), INTERVAL 10 DAY)), -- Fora do intervalo
	(2, 3, 400, DATE_SUB(CURDATE(), INTERVAL 1 DAY)), -- Antes de hoje
	(3, 2, 300, DATE_ADD(CURDATE(), INTERVAL 3 DAY)),
    (1, 1, 500, CURDATE()),             -- Hoje
	(1, 1, 600, DATE_ADD(CURDATE(), INTERVAL 2 DAY)); -- Dentro de 5 dias

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

update fazenda set fkEmpresa = 1 where idFazenda = 2;
select * from talhao;
select * from fazenda;
select * from endereco;
select * from usuario;
select * from pulverizacao;
select * from agrotoxico;
select * from empresa;
SET FOREIGN_KEY_CHECKS = 0;

SELECT
    p.dataPulverizacao,
	f.idFazenda,
    t.nomeTalhao,
    a.nome,
    p.qtdML,
    ROUND(p.qtdML * (a.precoPorLitro / 1000), 4) as valor
FROM 
    pulverizacao p
INNER JOIN 
    Talhao t ON p.fkTalhao = t.idTalhao
INNER JOIN 
    Fazenda f ON t.fkFazenda = f.idFazenda
INNER JOIN 
	Agrotoxico a ON p.fkAgrotoxico = a.idAgrotoxico
WHERE 
    dataPulverizacao BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY)
ORDER BY 
    dataPulverizacao ASC;
    
SELECT 
	p.dataPulverizacao,
	f.nomeFazenda,
    t.nomeTalhao,
    a.nome AS nomeAgrotoxico,
    SUM(p.qtdML) AS qtdTotalML,
    ROUND(SUM(p.qtdML * (a.precoPorLitro / 1000)), 2) AS valorTotal
FROM 
    Pulverizacao p
INNER JOIN 
    Talhao t ON p.fkTalhao = t.idTalhao
INNER JOIN 
    Fazenda f ON t.fkFazenda = f.idFazenda
INNER JOIN 
    Agrotoxico a ON p.fkAgrotoxico = a.idAgrotoxico
WHERE 
    p.dataPulverizacao BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY) AND f.fkEmpresa = 1
GROUP BY 
    p.dataPulverizacao, a.nome
ORDER BY 
    p.dataPulverizacao ASC;
    
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
	f.fkEmpresa = 1
GROUP BY
	MONTH(p.dataPulverizacao)
ORDER BY
	MONTH(p.dataPulverizacao);