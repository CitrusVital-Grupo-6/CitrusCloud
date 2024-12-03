var database = require("../database/config");

function listarDefensivosPorPraga(idPraga, temp) {
    var instrucaoSql = `
        SELECT 
            a.idAgrotoxico,
            a.nome nomeAgrotoxico,
            a.minTemperatura,
            a.maxTemperatura,
            a.minSemChuva,
            a.qtdMl,
            a.precoPorLitro
        FROM 
            Agrotoxico a
        JOIN 
            Controle c ON a.idAgrotoxico = c.fkAgrotoxicoControle
        WHERE 
            c.fkPragaControle = ${idPraga}
            AND ${temp} BETWEEN a.minTemperatura AND a.maxTemperatura
        LIMIT 4;
    `;
    return database.executar(instrucaoSql);
}

function adicionarPulverizacao(fkTalhao, fkAgrotoxico, dataPulverizacao) {
    var instrucaoSql = `
        INSERT INTO Pulverizacao (fkTalhao, fkAgrotoxico, dataPulverizacao) VALUES 
        (${fkTalhao}, ${fkAgrotoxico}, '${dataPulverizacao}');`;
    return database.executar(instrucaoSql);
}

function listarPulverizacaoPorEmpresa(idEmpresa) {
    var instrucaoSql = `
    SELECT
        p.dataPulverizacao,
        p.idPulverizacao,
        f.nomeFazenda,
        t.nometalhao,
        a.nome,
        p.qtdml
    FROM pulverizacao p
        JOIN talhao t
        JOIN agrotoxico a
        JOIN fazenda f
        JOIN empresa e
    WHERE f.fkEmpresa = e.idEmpresa
        AND idEmpresa=${idEmpresa}`

    return database.executar(instrucaoSql);
}

module.exports = {
    listarDefensivosPorPraga,
    adicionarPulverizacao,
    listarPulverizacaoPorEmpresa
};