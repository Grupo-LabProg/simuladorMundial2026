let datos;
let from = 0;
const cantidad = 10;

const labelscontent = document.querySelector(".label-content");
const errorDiv = document.querySelector(".error-message");
const container = document.querySelector(".content-table");

async function nuevo() {
  try {
    const arrayDatos = [];
    console.log("fromCli:", from, "cantidad:", cantidad);

    // Realizar la llamada a la API para obtener los nuevos datos
    const response = await fetch(
      `http://localhost:3000/api/ranking?cantidad=${cantidad}&from=${from}`
    );
    // Obtener los datos JSON de la respuesta
    const datos = await response.json();

    // Si no hay datos, mostrar mensaje de error
    if (datos.length == 0) {
      errorDiv.style.display = "flex"; // Mostramos el mensaje de error
      console.log("El arreglo está vacío.");
      return;
    } else {
      // Si hay datos, continuar con la actualización del DOM
      console.log("Datos obtenidos: ", datos);
      errorDiv.style.display = "none";

      // Seleccionar el contenedor para los nuevos elementos
      const container = document.querySelector(".content-table");
      if (!container) {
        console.error("No se encontró el contenedor .content-table");
        return;
      }

      // Limpiar el contenedor antes de agregar nuevos datos
      container.innerHTML = ""; // Elimina todos los elementos previos

      // Crear un fragmento de documento para agregar los nuevos elementos de manera eficiente
      const fragment = document.createDocumentFragment();

      // Recorrer los datos y agregar los elementos al fragmento
      datos.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        const rankElement = document.createElement("span");
        rankElement.classList.add("rank-id");
        rankElement.textContent = item.rank;

        const countryElement = document.createElement("span");
        countryElement.classList.add("name-country");
        countryElement.textContent = item.name;

        const flagImage = document.createElement("img");
        flagImage.src = item.flag;
        flagImage.alt = `img-country-${item.name}`;

        const pointsElement = document.createElement("span");
        pointsElement.classList.add("points");
        pointsElement.textContent = item.points;

        // Agregar los elementos al div item
        itemElement.appendChild(rankElement);
        itemElement.appendChild(countryElement);
        itemElement.appendChild(flagImage);
        itemElement.appendChild(pointsElement);

        // Agregar el item al fragmento
        fragment.appendChild(itemElement);
      });

      // Agregar todos los elementos de una vez al contenedor
      container.appendChild(fragment);
    }
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

// Función para manejar el botón "derecha"
document.querySelector(".rigth").addEventListener("click", () => {
  // Incrementar 'from' para cargar los siguientes 10 elementos
  if (from <= 207) {
    from += cantidad;
    nuevo();
  }
});

// Función para manejar el botón "izquierda"
document.querySelector(".left").addEventListener("click", () => {
  // Decrementar 'from' para cargar los elementos anteriores (si no estamos en la primera página)
  if (from >= cantidad) {
    from -= cantidad;
    nuevo();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  nuevo(); // Llama a la función que rellena la página
  insertHeader();
});

const headerHTML1 = `<div class="logo">
        <a href=""><img src="../assets/img/logo.png" alt="Logo" /></a>
      </div>
      <input type="checkbox" id="nav_check" hidden />
      <nav>
        <ul class="nav_menu">
          <li><a class="link" href="../index.html">Inicio</a></li>
        <li>
          <a class="link" href=".." data-target="confederaciones">Confederaciones</a>
        </li>
        <li>
          <a class="link" href=".." data-target="sorteoFaseGrupos">Fase de Grupos</a>
        </li>
        <li><a href="../faseFinal/faseFinal.html" target="">Fase Final</a></li>
        <li><a href="../historial/historial.html" target="">Historial</a></li>
        <li><a href="../ranking/ranking.html" target="">Ranking</a></li>
        </ul>
      </nav>`;

function insertHeader() {
  const headerContainer = document.getElementById("header");
  headerContainer.innerHTML = headerHTML1;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("link")) {
      //event.preventDefault(); // Evita el comportamiento predeterminado del enlace
      const target = event.target.dataset.target; // Obtengo el valor de data-target
      localStorage.setItem("targetSection", target); // Guarda el valor en localStorage
      // window.location.href = event.target.href; // Redirige a la página principal
    }
  });
});
