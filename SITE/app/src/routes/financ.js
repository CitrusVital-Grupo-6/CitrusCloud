var express = require("express");
var router = express.Router();

var financController = require("../controllers/financController");

router.get("/listNextBuyDefen/:idEmpresa", function (req, res) {
    financController.listNextBuyDefen(req, res);
})

router.get("/getTotalValueMonth/:idEmpresa", function (req, res) {
    financController.getTotalValueMonth(req, res);
})

module.exports = router;