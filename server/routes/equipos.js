// module.exports = function(app) {
    
// }
// server/routes/equipos.js
const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equiposController');

// Ruta para obtener todos los equipos
router.get('/', equiposController.getEquipos);

// Ruta para agregar un nuevo equipo
router.post('/', equiposController.addEquipo);

module.exports = router;
