var express = require("express");
var router = express.Router();

var talhaoController = require("../controllers/talhaoController");

router.get("/exibirTalhao", function (req, res) {
    talhaoController.exibirTalhao(req, res);
});

router.post("/adicionarTalhao", function (req, res) {
  talhaoController.adicionarTalhao(req, res);
});

router.get("/buscarTalhao/:idTalhao", function (req, res) {
  talhaoController.buscarTalhao(req, res);
});

router.put("/atualizarTalhao/:idTalhao", function (req, res) {
  talhaoController.atualizarTalhao(req, res);
});

router.delete("/deletarTalhao/:idTalhao", function (req, res) {
  talhaoController.deletarTalhao(req, res);
});


module.exports = router;