// server/controllers/equiposController.js
const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, "../data/confederaciones.json");

// Función para obtener los equipos
exports.getEquipos = (req, res) => {
  // console.log('dirname'+__dirname);
  // res.status(404).json({error: 'sdffdasdds'});
  const data = fs.readFileSync(dataPath, "utf-8");
  const equipos = JSON.parse(data);
  // console.log('data: ' + data);
  // console.log('equipos: ' + equipos);
  res.json(equipos);
};

exports.addClasificados = (req, res) => {
  const clasificados = req.body.equipos;
  const fileName = path.join(__dirname, "../data/clasificados.json");

  if (!clasificados || clasificados.length === 0) {
    return res.status(400).json({ error: "No se proporcionaron equipos." });
  }

  fs.writeFile(fileName, JSON.stringify(clasificados, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al guardar el archivo." });
    }

    res
      .status(200)
      .json({ message: "Archivo de equipos creado correctamente." });
  });
};

// TODO Función para agregar un equipo
// exports.addEquipo = (req, res) => {
//   const { confederacion, nombre, flag } = req.body;
//   if (!confederacion || !nombre || !flag) {
//     return res.status(400).json({ error: 'Todos los campos son requeridos' });
//   }

//   const data = fs.readFileSync(dataPath, 'utf-8');
//   const equipos = JSON.parse(data);
//   equipos.push({ confederacion, nombre, flag });
//   fs.writeFileSync(dataPath, JSON.stringify(equipos, null, 2));

//   res.status(201).json({ message: 'Equipo agregado', equipo: { confederacion, nombre, flag } });
// };
