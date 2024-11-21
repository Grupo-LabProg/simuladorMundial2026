const path = require("path");
const fs = require("fs");
const rankPath = path.join(__dirname, "../data/ranking.json");

// Función para obtener el ranking
exports.getRanking = (req, res) => {
  const data = fs.readFileSync(rankPath, "utf-8");
  const ranking = JSON.parse(data);

  res.json(ranking);
}

// Función para obtener los detalles de un país por su ID (rank)
exports.getCountryDetails = (req, res) => {
  const countryId = req.params.id;
  const data = fs.readFileSync(rankPath, "utf-8");
  const ranking = JSON.parse(data);

  // Obtengo el primer elemento cuyo id sea igual al recibido por parámetro
  const country = ranking.find(c => c.id === parseInt(countryId, 10));

  if (country) {
    res.json(country);
  } else {
    res.status(404).json({ error: "País no encontrado "});
  }
}