var express = require("express");
var router = express.Router();
const terminalController = require("../controllers/terminal-controller");

router.get("/", terminalController.get_terminals);

module.exports = router;
