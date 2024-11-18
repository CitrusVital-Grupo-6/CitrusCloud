var express = require("express");
var router = express.Router();

var fazendaController = require("../controllers/fazendaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarFazenda", function (req, res) {
    fazendaController.adicionarFazenda(req, res);
})

router.get("/exibirFazenda", function (req, res) {
    fazendaController.exibirFazenda(req, res);
})




module.exports = router;