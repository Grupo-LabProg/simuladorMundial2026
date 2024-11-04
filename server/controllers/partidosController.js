// server/controllers/partidosController.js
let partidos = []; // Almacenará los partidos en memoria

// Función para obtener todos los partidos
exports.getPartidos = (req, res) => {
  res.json(partidos);
};

// Función para agregar un partido
exports.addPartido = (req, res) => {
  const { equipo1, equipo2, resultado } = req.body;
  if (!equipo1 || !equipo2 || !resultado) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const partido = { equipo1, equipo2, resultado };
  partidos.push(partido);
  res.status(201).json({ message: 'Partido agregado', partido });
};
