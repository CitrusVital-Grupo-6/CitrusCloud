var database = require("../database/config")

function adicionarTalhao(nome, tipoLaranja, tamanhoHec, idFazenda) {

  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():",nome, tipoLaranja, tamanhoHec, idFazenda);
  var instrucaoSql = `
      INSERT INTO Talhao (nome, tipoLaranja, tamanhoHec, fkFazenda) VALUES ('${nome}', '${tipoLaranja}', '${tamanhoHec}', ${idFazenda})`;
  
  return database.executar(instrucaoSql);
}



function consultarTalhao(idFazenda) {

    
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", idFazenda);

    var instrucaoSql = `
        SELECT * FROM Talhao WHERE fkFazenda = ${idFazenda} `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

} 




module.exports = {

    consultarTalhao,
    adicionarTalhao
}