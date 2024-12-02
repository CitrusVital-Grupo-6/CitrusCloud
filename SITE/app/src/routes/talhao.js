var express = require("express");
var router = express.Router();

var talhaoController = require("../controllers/talhaoController");

router.get("/exibirTalhao", function (req, res) {
    talhaoController.exibirTalhao(req, res);
});

router.post("/adicionarTalhao", function (req, res) {
  talhaoController.adicionarTalhao(req, res);
});


module.exports = router;