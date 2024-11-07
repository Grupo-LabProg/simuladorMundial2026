// module.exports = function(app) {

// }

// server/routes/partidos.js
const express = require('express');
const router = express.Router();
const partidosController = require('../controllers/partidosController');

// Ruta para obtener todos los partidos
router.get('/', partidosController.getPartidos);

// Ruta para agregar un nuevo partido
router.post('/', partidosController.addPartido);

module.exports = router;
