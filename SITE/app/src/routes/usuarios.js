var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarPorEmpresa/:idEmpresa", function (req, res) {
    usuarioController.listarPorEmpresa(req, res);
});

router.get("/listarPorUsuario/:idUsuario", function (req, res) {
    usuarioController.listarPorUsuario(req, res);
});

router.put("/editarUsuario/:idUsuario", function (req, res) {
    usuarioController.editarUsuario(req, res);
});


router.delete("/deletarUsuario/:idUsuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});



module.exports = router;