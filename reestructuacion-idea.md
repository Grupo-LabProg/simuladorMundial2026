`proyecto/`
├── `server/`                     _# Código del backend (Node.js y Express)_
│   ├── `app.js`                  _# Configuración principal de Express_
│   ├── `controllers/`            _# Controladores para manejar la lógica de cada endpoint_
│   │   ├── `equiposController.js` _# Lo renombro de "confederaciones" a "EquiposController"_
│   │   └── `partidosController.js`
│   ├── `routes/`                 _# Rutas de la API organizadas por entidad_
│   │   ├── `equipos.js` _# Lo renombro de "confederaciones" a "Equipos"_
│   │   └── `partidos.js`
│   └── `data/`                   _# Datos en formato JSON o arrays en memoria_
│       └── `equipos.json` _# de "confederaciones" pasa a ser "Equipos"_
├── `client/`                     _# Archivos del frontend (página web)_
│   ├── `index.html`              _# Página de inicio con navegación dinámica_
│   ├── `index.js`                _# Lógica para la navegación y contenido dinámico en index.html_
│   ├── `index.css`               _# Estilos de la página de inicio_
│   ├── `faseFinal/`              _# Página de la fase final del torneo_
│   │   ├── `faseFinal.html`
│   │   ├── `faseFinal.js`
│   │   └── `faseFinal.css`
│   ├── `historial/`              _# Página de historial de partidos_
│   │   ├── `historial.html`
│   │   ├── `historial.js`
│   │   └── `historial.css`
│   └── `assets/`                 _# Recursos compartidos (imágenes, estilos globales)_
│       ├── `css/`
│       │    └── `paletaColores.css`
│       └── `img/`
│           ├── `flags-icon/`
│           ├── `logo.png`
│           └── `fondo.jpeg`
└── README.md
