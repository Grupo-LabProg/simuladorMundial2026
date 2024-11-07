// server/controllers/partidosController.js
const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, '../data/partidos.json');

// Función para obtener todos los partidos
exports.getPartidos = (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  const partidos = JSON.parse(data);
  res.json(partidos);
};

// Función para agregar un partido
exports.addPartido = (req, res) => {
  const { equipo1, equipo2, resultado } = req.body;
  if (!equipo1 || !equipo2 || !resultado) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const partido = { equipo1, equipo2, resultado };
  partidos.push(partido); // Falta hacer que realmente cree un nuevo partido y lo guarde
  res.status(201).json({ message: 'Partido agregado', partido });
};
