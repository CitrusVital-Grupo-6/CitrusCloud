var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT funcao, idUsuario, nomeCompleto, email, fkEmpresa AS idEmpresa FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nomeEmpresa, cnpjEmpresa, telefoneEmpresa, nomeFunc, funcaoFunc, cpfFunc, emailFunc, senhaFunc) {
    var instrucaoSqlEmpresa = `
        INSERT INTO Empresa (nome, cnpj, telefone) 
        VALUES ('${nomeEmpresa}', '${cnpjEmpresa}', '${telefoneEmpresa}');
    `;
    
    var instrucaoSqlUsuario = `
        INSERT INTO Usuario (nomeCompleto, cpf, email, senha, funcao, fkEmpresa) 
        SELECT '${nomeFunc}', '${cpfFunc}', '${emailFunc}', '${senhaFunc}', '${funcaoFunc}', idEmpresa
        FROM Empresa
        WHERE cnpj = '${cnpjEmpresa}';
    `;

    return database.executar(instrucaoSqlEmpresa).then(() => database.executar(instrucaoSqlUsuario));
}

function listarPorEmpresa(idEmpresa) {
    var instrucaoSql = `
    SELECT u.*, e.* -- Seleciona todas as colunas de Usuario (u) e Empresa (e)
    FROM Usuario u
    JOIN Empresa e ON u.fkEmpresa = e.idEmpresa -- Junta as tabelas com base na fkEmpresa
    WHERE u.fkEmpresa = ${idEmpresa};`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT * FROM Usuario WHERE idUsuario = ${idUsuario};`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarUsuario(novoNome, idUsuario, novaFuncao, novoCpf, novoEmail) {
    var instrucaoSql = `
        UPDATE Usuario SET nomeCompleto = '${novoNome}', cpf = '${novoCpf}', email = '${novoEmail}', funcao = '${novaFuncao}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarUsuario(idUsuario) {
    var instrucaoSql = `
        DELETE FROM Usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarPorEmpresa,
    listarPorUsuario,
    editarUsuario,
    deletarUsuario
};