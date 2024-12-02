var pulverizacaoModel = require("../models/pulverizacaoModel");

function listarDefensivosPorPraga(req, res) {
    var idPraga = req.params.idPraga;

    pulverizacaoModel.listarDefensivosPorPraga(idPraga)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum defensivo encontrado para esta praga!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os defensivos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function adicionarPulverizacao(req, res) {
    var fkTalhao = req.body.fkTalhaoServer;
    var fkAgrotoxico = req.body.fkAgrotoxicoServer;
    var dataPulverizacao = req.body.dataPulverizacaoServer;

    pulverizacaoModel.adicionarPulverizacao(fkTalhao, fkAgrotoxico, dataPulverizacao)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao adicionar a pulverização: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarDefensivosPorPraga,
    adicionarPulverizacao
};