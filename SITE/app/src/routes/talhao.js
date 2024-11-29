var express = require("express");
var router = express.Router();

var talhaoController = require("../controllers/talhaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
//router.post("/cadastrarFazenda", function (req, res) {
  //  fazendaController.adicionarFazenda(req, res);
//})

router.get("/exibirTalhao", function (req, res) {
    talhaoController.exibirTalhao(req, res);
});


module.exports = router;