var talhaoModel = require("../models/talhaoModel");


function adicionarTalhao(req, res) {
    const {nomeTalhao, tipoLaranja, tamanhoHectar, idFazenda} = req.body;

    talhaoModel.adicionarTalhao(nomeTalhao, tipoLaranja, tamanhoHectar, idFazenda).then(
        function (resultado) {
            res.status(200).json({ message: "Talhão adicionado com sucesso!", talhao: resultado });
        }
    ).catch(
        function (erro) {
            console.error(erro);
            res.status(500).json({ error: 'Houve um erro ao adicionar o talhão!' });
        }
    );
}

function exibirTalhao(req, res) {
    const idFazenda = req.query.idFazenda;

    talhaoModel.consultarTalhao(idFazenda).then(
        function (resultado) {
            res.status(200).json(resultado);
        }
    ).catch(
        function (erro) {
            console.error(erro);
            res.status(500).json({ error: 'Houve um erro ao realizar a consulta!' });
        }
    );
}

module.exports = {
    exibirTalhao,
    adicionarTalhao
}