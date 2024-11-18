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


function adicionarEndereco(cep, numero, complemento, descricao) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", cep, numero, complemento, descricao);

    var instrucaoSql = `
        INSERT INTO endereco (cep, numero, complemento, descricao) VALUES ('${cep}', '${numero}', '${complemento}', '${descricao}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function consultarFazenda() {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():",);

    var instrucaoSql = `
        SELECT * FROM Fazenda JOIN endereco WHERE fkEndereco = idEndereco `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

} 
// function mandarMensagem(nomeCompleto, email, telefone, mensagem) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mandarMensagem():", nomeCompleto, email, telefone, mensagem);
//     var instrucaoSql = `
//         INSERT INTO Mensagem (nomeCompleto, email, telefone, mensagem) VALUES ('${nomeCompleto}', '${email}', '${telefone}', '${mensagem}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    consultarEndereco,
    adicionarFazenda,
    adicionarEndereco,
    consultarFazenda
    // mandarMensagem
};