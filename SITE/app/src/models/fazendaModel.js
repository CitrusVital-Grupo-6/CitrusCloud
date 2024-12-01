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

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():",);

    var instrucaoSql = `
        SELECT * FROM Fazenda JOIN endereco WHERE fkEndereco = idEndereco `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function buscarFazenda(idFazenda) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", idFazenda);

    var instrucaoSql = `
        SELECT * FROM Fazenda JOIN Endereco ON fkEndereco = idEndereco  WHERE idFazenda = ${idFazenda} `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function atualizarFazenda(nome, cep, numero, complemento, idFazenda) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", idFazenda, nome, cep, numero, complemento,);


    var instrucaoSql = `  
    UPDATE Fazenda JOIN Endereco ON fkEndereco = idEndereco SET nome = '${nome}', cep = '${cep}', numero = '${numero}', complemento = '${complemento}' WHERE idFazenda = ${idFazenda};
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarEndereco(idEndereco) {
    console.log("Tentando deletar o endereço com ID: " + idEndereco);
    var instrucaoSql = `
        DELETE FROM Endereco WHERE idEndereco = ${idEndereco};
    `;
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
    consultarFazenda,
    adicionarEndereco,
    atualizarFazenda,
    buscarFazenda,
    deletarEndereco,
    deletarFazenda,
    deletarEndereco,
    buscarTalhoesPorFazenda,
    deletarTalhao
    // mandarMensagem
};