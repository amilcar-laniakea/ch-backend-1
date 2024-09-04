const express = require("express");
const router = express.Router();

const Actions = require("../controllers/static.controller.js");

const Action = new Actions();

router.get("/", async (req, res) => Action.renderHome(req, res));

module.exports = router;
