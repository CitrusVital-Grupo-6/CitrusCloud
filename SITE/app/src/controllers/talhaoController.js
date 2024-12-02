var talhaoModel = require("../models/talhaoModel");

function adicionarTalhao(req, res) {
    const {nomeTalhao, tipoLaranja, tamanhoHectar, idFazenda, idEmpresa} = req.body;

    talhaoModel.adicionarTalhao(nomeTalhao, tipoLaranja, tamanhoHectar, idFazenda, idEmpresa).then(
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

function buscarFazenda(req, res) {
    var idFazenda = req.params.idFazenda;
    fazendaModel.buscarFazenda(idFazenda).then((resultado) => {
      res.status(200).json(resultado);
    });
  }

  function buscarTalhao(req, res) {
    var idTalhao = req.params.idTalhao;

    talhaoModel.buscarTalhao(idTalhao)
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

function atualizarTalhao(req, res) {
    let idTalhao = req.params.idTalhao;
    let nome = req.body.nomeServer;
    let tipoLaranja = req.body.tipoLaranjaServer;
    let tamanhoHec = req.body.tamanhoHecServer;

    talhaoModel.atualizarTalhao(nome, tipoLaranja, tamanhoHec, idTalhao)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ error: erro.sqlMessage });
        });
}

function deletarTalhao(req, res) {
    const idTalhao = req.params.idTalhao;

    talhaoModel.buscarPulverizacaoPorTalhao(idTalhao)
        .then(pulverizacoes => {
            if (pulverizacoes.length > 0) {
                const deletePromises = pulverizacoes.map(pulverizacao => {
                    return talhaoModel.deletarPulverizacao(pulverizacao.idPulverizacao);
                });

                return Promise.all(deletePromises)
                    .then(() => {
                        return talhaoModel.deletarTalhao(idTalhao);
                    });
            } else {
                return talhaoModel.deletarTalhao(idTalhao);
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
    exibirTalhao,
    adicionarTalhao,
    buscarFazenda,
    buscarTalhao,
    atualizarTalhao,
    deletarTalhao
}