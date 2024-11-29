var talhaoModel = require("../models/talhaoModel");


function exibirTalhao(req, res) {
    const idFazenda = req.query.idFazenda; // Assumindo que você espera um parâmetro na query string

    talhaoModel.consultarTalhao(idFazenda).then(
        function (resultado7) {
            console.log(resultado7);
            res.status(200).json(resultado7);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json({ error: 'Houve um erro ao realizar a consulta!' });
        }
    );
}


module.exports = {
    exibirTalhao
}