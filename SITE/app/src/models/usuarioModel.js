var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nomeCompleto, email, senha, funcao, fkEmpresa AS idEmpresa FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(empresa, representante, celular, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", empresa, representante, celular, email, senha);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, telefone, fkEmpresa) VALUES ('${representante}', '${email}', '${senha}', '${celular}', (select idEmpresa FROM empresa WHERE cnpj = '${empresa}'))`;
        
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
    autenticar,
    cadastrar,
    // mandarMensagem
};