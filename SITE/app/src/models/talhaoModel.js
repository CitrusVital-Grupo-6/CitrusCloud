var database = require("../database/config")

function adicionarTalhao(nome, tipoLaranja, tamanhoHec, idFazenda) {
  var instrucaoSql = `INSERT INTO Talhao (nomeTalhao, tipoLaranja, tamanhoHec, fkFazenda) VALUES ('${nome}', '${tipoLaranja}', '${tamanhoHec}', ${idFazenda})`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function consultarTalhao(idFazenda) {
    var instrucaoSql = `SELECT * FROM Talhao WHERE fkFazenda = ${idFazenda} `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
} 

function buscarTalhao(idTalhao) {
    var instrucaoSql = `SELECT * FROM Talhao WHERE idTalhao = ${idTalhao} `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarTalhao(nome, tipoLaranja, tamanhoHec, idTalhao) {
    var instrucaoSql = `UPDATE Talhao SET nomeTalhao = '${nome}', tipoLaranja = '${tipoLaranja}', tamanhoHec = '${tamanhoHec}' WHERE idTalhao = ${idTalhao};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarTalhao(idTalhao) {
    var instrucaoSql = `DELETE FROM Talhao WHERE idTalhao = ${idTalhao};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPulverizacaoPorTalhao(idTalhao) {
    var instrucaoSql = `SELECT * FROM Pulverizacao WHERE fkTalhao = ${idTalhao};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPulverizacao(idPulverizacao) {
    var instrucaoSql = `DELETE FROM Pulverizacao WHERE idPulverizacao = ${idPulverizacao};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    consultarTalhao,
    adicionarTalhao,
    buscarTalhao,
    atualizarTalhao,
    deletarTalhao,
    buscarPulverizacaoPorTalhao,
    deletarPulverizacao
}