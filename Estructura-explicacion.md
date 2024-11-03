### Explicación de la Estructura

- **`server`**: Carpeta principal del _backend_.
  - `app.js`: Archivo principal de configuración del servidor, donde cargamos Express y definimos el middleware necesario.
  - **`controllers`**: Acá colocamos la lógica de cada endpoint, organizando las funciones en archivos por tipo de recurso (e.g., `equiposController.js` para manejar las confederaciones).
  - **`routes`**: Contiene las rutas de la API, organizadas también por recurso. Cada archivo de rutas (`equipos.js`, `partidos.js`, etc.) corresponde a un tipo de dato que la API manejará.
  - **`data`**: Aquí almacenamos los datos en formato JSON o en arreglos de JavaScript si no usamos bases de datos. `confederaciones.json` contiene la información de las confederaciones y países.

- **`client`**: Todo el código del frontend.
  - Cada página tiene su propio directorio (e.g., `confederaciones`, `faseFinal`, etc.) con su archivo HTML, JavaScript, y CSS para facilitar el mantenimiento.
  - **`assets`**: Para almacenar archivos compartidos como imágenes y estilos globales (e.g., `paletaColores.css`).

### Ventajas de esta estructura

- **Modularidad:** Cada página tiene sus propios archivos en una carpeta dedicada, lo cual facilita hacer cambios sin confundir o modificar los archivos de otra página.
- **Estructura lógica:** Los nombres de los archivos coinciden con la funcionalidad de la página (index, historial, faseFinal), lo que facilita identificar rápidamente el propósito de cada archivo.
- **Carpeta assets para elementos compartidos:** Al tener una carpeta assets, se centralizan los archivos comunes (imágenes, colores, iconos, etc.), lo que permite usarlos en múltiples páginas sin duplicar archivos.
- **Código backend y frontend separados:** El backend permanece en la carpeta server, y el frontend en public, manteniendo claras las responsabilidades de cada uno.
