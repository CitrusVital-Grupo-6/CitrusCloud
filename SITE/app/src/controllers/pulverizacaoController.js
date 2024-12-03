var pulverizacaoModel = require("../models/pulverizacaoModel");

function listarDefensivosPorPraga(req, res) {
    var idPraga = req.body.idPragaServer
    var temp = req.body.tempServer

    pulverizacaoModel.listarDefensivosPorPraga(idPraga, temp)
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

    console.log(fkTalhao, fkAgrotoxico, dataPulverizacao)

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

function listarPulverizacaoPorEmpresa(req, res) {
    const idEmpresa = req.params.companyId;

    // Validação do parâmetro companyId
    if (!idEmpresa || isNaN(idEmpresa)) {
        return res.status(400).json({ erro: 'ID da empresa inválido.' });
    }

    pulverizacaoModel.listarPulverizacaoPorEmpresa(idEmpresa)
        .then(function (resultado) {
            // Se o resultado estiver vazio, retorna um erro 404
            if (!resultado || resultado.length === 0) {
                return res.status(404).json({ erro: 'Nenhuma pulverização encontrada para a empresa.' });
            }

            // Inicializa o array para os eventos
            const eventsArr = [];

            // Processa cada linha de dados (resultado)
            resultado.forEach(dia => {
                const diaFormatado = dia.dataPulverizacao.toString();
                const [day, month, year] = diaFormatado.split("-");

                // Monta o objeto newData
                const newData = {
                    id_pulv: dia.idPulverizacao,
                    nome_defen: dia.nome,
                    nome_fazenda: dia.nomeFazenda,
                    nome_talhao: dia.nometalhao, // Corrigido nome da propriedade
                    qtd_ml: dia.qtdml || 0,  // Caso qtdml seja null, assume 0
                };

                // Adiciona no eventsArr com as informações de dia, mês e ano
                const event = eventsArr.find(event => event.day === day && event.month === parseInt(month) && event.year === year);

                if (event) {
                    // Se já existir um evento para esse dia, adiciona os dados
                    event.data.push(newData);
                } else {
                    // Se não existir, cria um novo evento
                    eventsArr.push({
                        day: day,
                        month: parseInt(month),
                        year: year,
                        data: [newData],
                    });
                }
            });

            // Retorna os dados formatados
            res.json(eventsArr);
        })
        .catch(function (erro) {
            console.error("Erro ao listar pulverização: ", erro);  // Log detalhado
            res.status(500).json({ erro: 'Erro interno no servidor.' });
        });
}


module.exports = {
    listarDefensivosPorPraga,
    adicionarPulverizacao,
    listarPulverizacaoPorEmpresa
};