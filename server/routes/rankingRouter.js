const express = require('express');
const router = express.Router();

const rankingController = require("../controllers/rankingController");

// Ruta para obtener todos los equipos del ranking
router.get("/", rankingController.getRanking);

module.exports = router;