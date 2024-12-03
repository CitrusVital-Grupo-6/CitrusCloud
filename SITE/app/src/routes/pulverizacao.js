var express = require("express");
var router = express.Router();

var pulverizacaoController = require("../controllers/pulverizacaoController");

router.post("/listarDefensivosPorPraga", function (req, res) {
    pulverizacaoController.listarDefensivosPorPraga(req, res);
});

router.post("/adicionarPulverizacao", function (req, res) {
    pulverizacaoController.adicionarPulverizacao(req, res);
});

router.get("/listarPulverizacaoPorEmpresa/:companyId", function (req, res) {
    pulverizacaoController.listarPulverizacaoPorEmpresa(req, res);
});

module.exports = router;