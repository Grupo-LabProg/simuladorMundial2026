// server/controllers/equiposController.js
const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, '../data/paises.js');

// Función para obtener los equipos
exports.getEquipos = (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  const equipos = JSON.parse(data);
  res.json(equipos);
};

// Función para agregar un equipo
exports.addEquipo = (req, res) => {
  const { confederacion, nombre, flag } = req.body;
  if (!confederacion || !nombre || !flag) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const data = fs.readFileSync(dataPath, 'utf-8');
  const equipos = JSON.parse(data);
  equipos.push({ confederacion, nombre, flag });
  fs.writeFileSync(dataPath, JSON.stringify(equipos, null, 2));

  res.status(201).json({ message: 'Equipo agregado', equipo: { confederacion, nombre, flag } });
};
