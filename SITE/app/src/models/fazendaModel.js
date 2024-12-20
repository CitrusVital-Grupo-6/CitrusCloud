var database = require("../database/config")


function consultarEndereco(cep, numero) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():",);

    var instrucaoSql = `
        SELECT idEndereco FROM endereco WHERE cep='${cep}' AND numero='${numero}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarFazenda(nome, idEndereco, idEmpresa) {
    var instrucaoSql = `INSERT INTO Fazenda (nomeFazenda, fkEndereco, fkEmpresa) VALUES ('${nome}', ${idEndereco}, ${idEmpresa})`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function adicionarEndereco(cep, numero, complemento) {
    var instrucaoSql = `INSERT INTO endereco (cep, numero, complemento) VALUES ('${cep}', '${numero}', '${complemento}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function consultarFazenda() {
    var instrucaoSql = `SELECT * FROM Fazenda JOIN endereco WHERE fkEndereco = idEndereco `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarFazenda(idFazenda) {
    var instrucaoSql = `SELECT * FROM Fazenda JOIN Endereco ON fkEndereco = idEndereco  WHERE idFazenda = ${idFazenda} `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarFazenda(nome, cep, numero, complemento, idFazenda) {
    var instrucaoSql = `UPDATE Fazenda JOIN Endereco ON fkEndereco = idEndereco SET nome = '${nome}', cep = '${cep}', numero = '${numero}', complemento = '${complemento}' WHERE idFazenda = ${idFazenda};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarEndereco(idEndereco) {
    var instrucaoSql = `DELETE FROM Endereco WHERE idEndereco = ${idEndereco};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarFazenda(idFazenda) {
    console.log("Tentando deletar a fazenda com ID: " + idFazenda);
    var instrucaoSql = `
        DELETE FROM Fazenda WHERE idFazenda = ${idFazenda};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTalhoesPorFazenda(idFazenda) {
    var instrucaoSql = `
        SELECT * FROM Talhao WHERE fkFazenda = ${idFazenda};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarTalhao(idTalhao) {
    var instrucaoSql = `
        DELETE FROM Talhao WHERE idTalhao = ${idTalhao};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPulverizacaoPorFazenda(idFazenda) {
    var instrucaoSql = `SELECT * FROM pulverizacao JOIN talhao WHERE fkFazenda = ${idFazenda};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPulverizacao(idPulverizacao) {
    var instrucaoSql = `DELETE FROM pulverizacao WHERE idPulverizacao = ${idPulverizacao};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    consultarEndereco,
    adicionarFazenda,
    consultarFazenda,
    adicionarEndereco,
    atualizarFazenda,
    buscarFazenda,
    deletarEndereco,
    deletarFazenda,
    deletarEndereco,
    buscarTalhoesPorFazenda,
    deletarTalhao,
    buscarPulverizacaoPorFazenda,
    deletarPulverizacao
};