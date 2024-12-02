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


function buscarFazenda(req, res) {
    var idFazenda = req.params.idFazenda;

    fazendaModel.buscarFazenda(idFazenda)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]); // Retorna a primeira fazenda encontrada
            } else {
                res.status(204).send("Nenhuma fazenda encontrada!"); // Não encontrou a fazenda
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar fazenda: ", erro);
            res.status(500).json({ error: erro.sqlMessage });
        });
}


function atualizarFazenda(req, res) {
    let idFazenda = req.params.idFazenda;
    let nome = req.body.nomeServer;
    let cep = req.body.cepServer;
    let numero = req.body.numeroServer;
    let complemento = req.body.complementoServer;

    fazendaModel.atualizarFazenda(nome, cep, numero, complemento, idFazenda)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ error: erro.sqlMessage });
        });
}

function deletarFazenda(req, res) {
    const idFazenda = req.params.idFazenda;

    fazendaModel.buscarTalhoesPorFazenda(idFazenda)
        .then(talhoes => {
            if (talhoes.length > 0) {
                const deletePromises = talhoes.map(talhao => {
                    return fazendaModel.deletarTalhao(talhao.idTalhao);
                });

                return Promise.all(deletePromises)
                    .then(() => {
                        return fazendaModel.deletarFazenda(idFazenda);
                    });
            } else {
                return fazendaModel.deletarFazenda(idFazenda);
            }
        })
        .then(() => {
            res.status(200).send("Fazenda e talhões deletados com sucesso!");
        })
        .catch(erro => {
            console.error("Erro ao deletar fazenda e talhões:", erro);
            res.status(500).json({ error: erro.sqlMessage });
        });
}


module.exports = {
    adicionarFazenda,
    exibirFazenda,
    atualizarFazenda,
    buscarFazenda,
    deletarFazenda,
    deletarFazenda,
    
}