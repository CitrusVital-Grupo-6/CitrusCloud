var database = require("../database/config");

function listarDefensivosPorPraga(idPraga) {
    var instrucaoSql = `
        SELECT a.* 
        FROM Agrotoxico a
        JOIN Pragas p ON a.tipo = p.controle  -- Verificar relacionamento entre tabelas
        WHERE p.idPragas = ${idPraga};
    `;
    return database.executar(instrucaoSql);
}

function adicionarPulverizacao(fkTalhao, fkAgrotoxico, dataPulverizacao) {
    var instrucaoSql = `
        INSERT INTO Pulverizacao (fkTalhao, fkAgrotoxico, dataPulverizacao)
        VALUES (${fkTalhao}, ${fkAgrotoxico}, '${dataPulverizacao}');
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarDefensivosPorPraga,
    adicionarPulverizacao
};