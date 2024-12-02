var express = require("express");
var router = express.Router();

var pulverizacaoController = require("../controllers/pulverizacaoController");

router.get("/listarDefensivosPorPraga/:idPraga", function (req, res) {
    pulverizacaoController.listarDefensivosPorPraga(req, res);
});

router.post("/adicionarPulverizacao", function (req, res) {
    pulverizacaoController.adicionarPulverizacao(req, res);
});

module.exports = router;