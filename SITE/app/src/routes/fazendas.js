var express = require("express");
var router = express.Router();

var fazendaController = require("../controllers/fazendaController");


router.post("/cadastrarFazenda", function (req, res) {
    fazendaController.adicionarFazenda(req, res);
})

router.get("/exibirFazenda", function (req, res) {
    fazendaController.exibirFazenda(req, res);
})

router.get("/buscarFazenda/:idFazenda", function (req, res) {
    fazendaController.buscarFazenda(req, res);
  });

router.put("/atualizarFazenda/:idFazenda", function (req, res) {
    fazendaController.atualizarFazenda(req, res);
  });


router.delete("/deletarFazenda/:idFazenda", function (req, res) {
  fazendaController.deletarFazenda(req, res);
});




module.exports = router;