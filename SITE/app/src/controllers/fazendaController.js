var fazendaModel = require("../models/fazendaModel");

function adicionarFazenda(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFazenda = req.body.nomeServer
    // var cidade = req.body.cidadeServer;
    var cep = req.body.cepServer;
    var descricao = req.body.descricaoServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js



    fazendaModel.adicionarEndereco(cep, numero, complemento, descricao).then(
        function (res3) {
            fazendaModel.consultarEndereco(cep, numero).then(
                function (resultado1) {

                    console.log('aquiiii:::' + resultado1);
                    fazendaModel.adicionarFazenda(nomeFazenda, resultado1[0].idEndereco).then(

                        function (resultado) {
                            console.log(resultado);
                            res.status(200).json(resultado);

                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
                        }
                    )
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
                }
            )
        }

    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
        }
    );

}

function exibirFazenda(req, res) {
    fazendaModel.consultarFazenda().then(
        function (resultado7) {
            console.log(resultado7);
            res.status(200).json(resultado7);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
        }
    );
}

module.exports = {
    adicionarFazenda,
    exibirFazenda
}