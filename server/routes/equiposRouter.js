// module.exports = function(app) {
    
// }
// server/routes/equipos.js

// Acá voy a manejar todos los errores 404, 500, etc
// (1) El router tiene la responsabilidad de manejar los req y res
// (2) Mandar al modelo a trabajar con los datos
// (3) Responder con 

// req.query.fecha
// usuarios = modelo.buscar(fecha)
// if (usuarios lenght = 0){
//   return res
// }



const express = require('express');
const router = express.Router();

const equiposController = require('../controllers/equiposController');

// Ruta para obtener todos los equipos
router.get('/', equiposController.getEquipos);

// TODO: Ruta para agregar un nuevo equipo
// router.post('/', equiposController.addEquipo);

module.exports = router;
