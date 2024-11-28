var database = require("../database/config")

function listNextBuyDefen(idEmpresa) {
    var instrucaoSql = ``;

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
            f.idFazenda = 1
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