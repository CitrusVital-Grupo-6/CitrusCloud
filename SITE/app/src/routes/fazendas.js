var express = require("express");
var router = express.Router();

var fazendaController = require("../controllers/fazendaController");

router.post("/cadastrarFazenda", function (req, res) {
    fazendaController.adicionarFazenda(req, res);
})

router.get("/exibirFazenda/:idEmpresa", function (req, res) {
    fazendaController.exibirFazenda(req, res);
})

module.exports = router;