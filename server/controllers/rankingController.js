const path = require("path");
const fs = require("fs");
const rankPath = path.join(__dirname, "../data/ranking.json");

// Función para obtener el ranking
exports.getRanking = (req, res) => {
  const data = fs.readFileSync(rankPath, "utf-8");
  const ranking = JSON.parse(data);

  res.json(ranking.ranking);
}