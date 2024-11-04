// server/app.js
const express = require('express');
const path = require('path');
const equiposRoutes = require('./routes/equipos');
const partidosRoutes = require('./routes/partidos');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/equipos', equiposRoutes);  // Rutas para los equipos
app.use('/api/partidos', partidosRoutes); // Rutas para los partidos

// Middleware para servir archivos estáticos desde `client`
app.use(express.static(path.join(__dirname, '../client')));

// Ruta principal para cargar `index.html` del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
