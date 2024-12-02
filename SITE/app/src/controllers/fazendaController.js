var fazendaModel = require("../models/fazendaModel");

function adicionarFazenda(req, res) {    
    var nomeFazenda = req.body.nomeServer
    var cep = req.body.cepServer;
    var descricao = req.body.descricaoServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;

    fazendaModel.adicionarEndereco(cep, numero, complemento, descricao).then(
        fazendaModel.consultarEndereco(cep, numero).then(
            function (resultado1) {

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
        })
    );
}

function exibirFazenda(req, res) {
    var idEmpresa = req.params.idEmpresa;
    
    fazendaModel.consultarFazenda(idEmpresa)
        .then(
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