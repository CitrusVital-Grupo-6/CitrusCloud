var financModel = require("../models/financModel");

function listNextBuyDefen(req, res) {
    var idEmpresa = req.body.idEmpresa;

    financModel.listNextBuyDefen(idEmpresa).then(
        function (resultado) {
            res.status(200).json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
        }
    );
};

function getTotalValueMonth(req, res) {
    var idEmpresa = req.body.idEmpresa;
    console.log("Bateu na controller")

    financModel.getTotalValueMonth(idEmpresa).then(
        function (resultado) {
            res.status(200).json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a consulta !Erro: ", erro.sqlMessage);
        }
    );
};

module.exports = {
    listNextBuyDefen,
    getTotalValueMonth
};