var database = require("../database/config")

function listNextBuyDefen(idEmpresa) {
    var instrucaoSql = `
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
            p.dataPulverizacao BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY) AND f.fkEmpresa = ${idEmpresa}
        GROUP BY 
            p.dataPulverizacao, a.nome
        ORDER BY 
            p.dataPulverizacao ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
};

function getTotalValueMonth(idEmpresa) {
    console.log("Bateu na model")

    var instrucaoSql = `        
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
            f.fkEmpresa = ${idEmpresa}
        GROUP BY
            MONTH(p.dataPulverizacao)
        ORDER BY
            MONTH(p.dataPulverizacao);
    `;

    return database.executar(instrucaoSql);
};

module.exports = {
    listNextBuyDefen,
    getTotalValueMonth
};