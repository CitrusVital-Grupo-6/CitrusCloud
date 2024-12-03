var fazendaModel = require("../models/fazendaModel");

function adicionarFazenda(req, res) {    
    var nomeFazenda = req.body.nomeServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var idEmpresa = req.body.idEmpresaServer;

    fazendaModel.adicionarEndereco(cep, numero, complemento, idEmpresa)
        .then(() => {
            // Introduzindo cooldown antes de consultar o endereço
            setTimeout(() => {
                fazendaModel.consultarEndereco(cep, numero)
                    .then((resultado1) => {
                        fazendaModel.adicionarFazenda(nomeFazenda, resultado1[0].idEndereco, idEmpresa)
                            .then((resultado) => {
                                console.log(resultado);
                                res.status(200).json(resultado);
                            })
                            .catch((erro) => {
                                console.error("Erro ao adicionar fazenda:", erro.sqlMessage);
                                res.status(500).json({ error: erro.sqlMessage });
                            });
                    })
                    .catch((erro) => {
                        console.error("Erro ao consultar endereço:", erro.sqlMessage);
                        res.status(500).json({ error: erro.sqlMessage });
                    });
            }, 2000); // Cooldown de 2 segundos
        })
        .catch((erro) => {
            console.error("Erro ao adicionar endereço:", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage });
        });
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
                // Busca as pulverizações associadas à fazenda
                return fazendaModel.buscarPulverizacaoPorFazenda(idFazenda)
                    .then(pulverizacoes => {
                        if (pulverizacoes.length > 0) {
                            // Deleta todas as pulverizações primeiro
                            const deletePulvPromises = pulverizacoes.map(pulverizacao =>
                                fazendaModel.deletarPulverizacao(pulverizacao.idPulverizacao)
                            );
                            return Promise.all(deletePulvPromises);
                        }
                    })
                    .then(() => {
                        // Após deletar as pulverizações, deleta os talhões
                        const deleteTalhoesPromises = talhoes.map(talhao =>
                            fazendaModel.deletarTalhao(talhao.idTalhao)
                        );
                        return Promise.all(deleteTalhoesPromises);
                    });
            }
        })
        .then(() => {
            // Após deletar pulverizações e talhões, deleta a fazenda
            return fazendaModel.deletarFazenda(idFazenda);
        })
        .then(() => {
            res.status(200).send("Fazenda, talhões e pulverizações deletados com sucesso!");
        })
        .catch(erro => {
            console.error("Erro ao deletar fazenda, talhões e pulverizações:", erro);
            res.status(500).json({ error: erro.sqlMessage || erro.message });
        });
}

module.exports = {
    adicionarFazenda,
    exibirFazenda,
    atualizarFazenda,
    buscarFazenda,
    deletarFazenda
}