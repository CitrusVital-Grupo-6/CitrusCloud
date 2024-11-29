var database = require("../database/config")


function consultarTalhao(idFazenda) {

    
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", idFazenda);

    var instrucaoSql = `
        SELECT * FROM Talhao JOIN Fazenda ON fkFazenda = ${idFazenda} WHERE idFazenda = ${idFazenda} `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

} 



//function adicionarTalhao() {

  //  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionarFazenda():", nome, idEndereco);

   // var instrucaoSql = `
     //   INSERT INTO Talhao (tipoLaranja, tamanhoHec, fkFazenda) VALUES ('Laranja Pêra', 5.0, 1 );`

   // console.log("Executando a instrução SQL: \n" + instrucaoSql);
   // return database.executar(instrucaoSql);

//}

module.exports = {

    consultarTalhao
}