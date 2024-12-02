var database = require("../database/config")


function consultarEndereco(cep, numero) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():",);

    var instrucaoSql = `
        SELECT idEndereco FROM endereco WHERE cep='${cep}' AND numero='${numero}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarFazenda(nome, idEndereco) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", nome, idEndereco);

    var instrucaoSql = `
        INSERT INTO Fazenda (nome, fkEndereco) VALUES ('${nome}', '${idEndereco}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function adicionarEndereco(cep, numero, complemento) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", cep, numero, complemento);

    var instrucaoSql = `
        INSERT INTO endereco (cep, numero, complemento) VALUES ('${cep}', '${numero}', '${complemento}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function consultarFazenda() {
    var instrucaoSql = `
        SELECT * FROM Fazenda JOIN endereco WHERE fkEndereco = idEndereco `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

} 

module.exports = {
    consultarEndereco,
    adicionarFazenda,
    adicionarEndereco,
    consultarFazenda
};