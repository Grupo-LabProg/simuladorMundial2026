import { equiposMundial2022 } from "./paises.js";

function hideNavMenu() {
  if (window.innerWidth <= 800) {
    document.getElementById("nav_check").checked = false;
  }
}

document.querySelectorAll("nav .link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el enlace navegue a otra página

    const target = link.getAttribute("data-target");

    // Oculta todas las secciones
    document.querySelectorAll(".content").forEach((section) => {
      section.classList.remove("active");
    });

    // Muestra la sección correspondiente
    if (target) {
      document.querySelector(`.${target}`).classList.add("active");
      hideNavMenu();
    }
  });
});

// Función para mezclar los equipos
function sorteo(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
  }
}

// Función para insertar la tabla
function insertarTabla(grupo, equipos) {
  const gruposDiv = document.querySelector(".grupos"); // Contenedor donde se insertará la tabla
  const faseGrupos = document.querySelector(".faseDegrupos");
  // Estructura HTML de la tabla
  let html = `
      <div class="table-container">
          <h3>Grupo ${grupo}</h3>
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Equipo</th>
                      <th>PJ</th>
                      <th>G</th>
                      <th>E</th>
                      <th>P</th>
                      <th>GF</th>
                      <th>GC</th>
                      <th>DG</th>
                      <th>Pts</th>
                      <th>Partidos</th>
                  </tr>
              </thead>
              <tbody>`;

  // Generar las filas de los equipos
  equipos.forEach((equipo, index) => {
    html += `
          <tr>
              <td>${index + 1}</td>
              <td class="team"><img src="${equipo.flag}" alt="${
      equipo.name
    }" width="20">${equipo.name}</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td><span class="circle default"></span><span class="circle default"></span><span class="circle default"></span></td>
          </tr>`;
  });

  html += `</tbody>
          </table>
      </div>`;

  // Insertar el HTML en el contenedor
  faseGrupos.insertAdjacentHTML("beforeend", html);
  gruposDiv.insertAdjacentHTML("beforeend", html);
}

// Función para simular resultados de partidos
function simularResultados(equipos) {
  equipos.forEach((equipo) => {
    // Generar resultados aleatorios
    equipo.PJ = 3; // Partidos Jugados
    equipo.G = Math.floor(Math.random() * 4); // Ganados
    equipo.E = Math.floor(Math.random() * (3 - equipo.G)); // Empatados
    equipo.P = 3 - (equipo.G + equipo.E); // Perdidos
    equipo.GF = equipo.G * (Math.floor(Math.random() * 4) + 1); // Goles a favor
    equipo.GC = equipo.P * (Math.floor(Math.random() * 4) + 1); // Goles en contra
    equipo.DG = equipo.GF - equipo.GC; // Diferencia de goles
    equipo.Pts = equipo.G * 3 + equipo.E; // Puntos
    // Asignar clase a los círculos según el resultado
    equipo.circles = [];
    for (let i = 0; i < equipo.G; i++) {
      equipo.circles.push("win"); // Ganas
    }
    for (let i = 0; i < equipo.E; i++) {
      equipo.circles.push("draw"); // Empates
    }
    for (let i = 0; i < equipo.P; i++) {
      equipo.circles.push("loss"); // Pérdidas
    }
  });
}

// Función para insertar la tabla
function simularFaseDeGrupos(grupo, equipos) {
  // Ordenar los equipos por puntos y diferencia de goles
  equipos.sort((a, b) => {
    if (b.Pts === a.Pts) {
      return b.DG - a.DG; // Ordenar por diferencia de goles si los puntos son iguales
    }
    return b.Pts - a.Pts; // Ordenar por puntos
  });

  const faseGrupos = document.querySelector(".faseDegrupos");
  // Estructura HTML de la tabla
  let html = `
      <div class="table-container">
          <h3 style="color:grey">Grupo ${grupo}</h3>
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Equipo</th>
                      <th>PJ</th>
                      <th>G</th>
                      <th>E</th>
                      <th>P</th>
                      <th>GF</th>
                      <th>GC</th>
                      <th>DG</th>
                      <th>Pts</th>
                      <th>Partidos</th>
                  </tr>
              </thead>
              <tbody>`;

  // Generar las filas de los equipos
  equipos.forEach((equipo, index) => {
    html += `
          <tr>
              <td>${index + 1}</td>
              <td class="team"><img src="${equipo.flag}" alt="${
      equipo.name
    }" width="20">${equipo.name}</td>
              <td>${equipo.PJ}</td>
              <td>${equipo.G}</td>
              <td>${equipo.E}</td>
              <td>${equipo.P}</td>
              <td>${equipo.GF}</td>
              <td>${equipo.GC}</td>
              <td>${equipo.DG}</td>
              <td>${equipo.Pts}</td>
              <td>${equipo.circles
                .map((circle) => `<span class="circle ${circle}"></span>`)
                .join("")}</td>
          </tr>`;
  });

  html += `</tbody>
          </table>
      </div>`;

  // Insertar el HTML en el contenedor
  faseGrupos.insertAdjacentHTML("beforeend", html);
}

document
  .getElementById("simularSorteoGruposBtn")
  .addEventListener("click", function () {
    sorteo(equiposMundial2022);

    // Crear los grupos
    const grupos = {};
    const letras = "ABCDEFGHIJKL"; // Letras para los grupos A-L

    for (let i = 0; i < letras.length; i++) {
      grupos[letras[i]] = equiposMundial2022.slice(i * 4, i * 4 + 4); // Asignar 4 equipos a cada grupo
    }

    // Limpiar grupos previos
    const gruposDiv = document.getElementById("grupos");
    gruposDiv.innerHTML = ""; // Limpiar el contenedor
    // Limpiar grupos previos
    const faseGrupos = document.getElementById("faseGrupos");
    faseGrupos.innerHTML = ""; // Limpiar el contenedor
    // Insertar tablas para cada grupo
    for (const grupo in grupos) {
      insertarTabla(grupo, grupos[grupo]);
    }

    console.log(grupos);
  });

document
  .getElementById("simularGruposBtn")
  .addEventListener("click", function () {
    // Crear los grupos
    const grupos = {};
    const letras = "ABCDEFGHIJKL"; // Letras para los grupos A-L

    for (let i = 0; i < letras.length; i++) {
      grupos[letras[i]] = equiposMundial2022.slice(i * 4, i * 4 + 4); // Asignar 4 equipos a cada grupo
    }

    // Limpiar grupos previos
    const faseGrupos = document.getElementById("faseGrupos");
    faseGrupos.innerHTML = ""; // Limpiar el contenedor

    const clasificados = []; // Arreglo para los clasificados

    // Insertar tablas para cada grupo
    for (const grupo in grupos) {
      simularResultados(grupos[grupo]); // Simular resultados para los equipos
      simularFaseDeGrupos(grupo, grupos[grupo]);

      // Agregar los dos primeros equipos al arreglo de clasificados
      clasificados.push(grupos[grupo][0]); // Primer equipo
      clasificados.push(grupos[grupo][1]); // Segundo equipo
    }

    // Calcular los mejores terceros
    const mejoresTerceros = [];
    for (let i = 0; i < letras.length; i++) {
      const equipoTercero = grupos[letras[i]][2]; // Tercer equipo de cada grupo
      mejoresTerceros.push(equipoTercero);
    }

    // Ordenar los mejores terceros
    mejoresTerceros.sort((a, b) => {
      if (b.Pts === a.Pts) {
        return b.DG - a.DG; // Ordenar por diferencia de goles si los puntos son iguales
      }
      return b.Pts - a.Pts; // Ordenar por puntos
    });

    // Agregar los mejores 3 terceros (8 en total) al arreglo de clasificados
    for (let i = 0; i < 8; i++) {
      clasificados.push(mejoresTerceros[i]);
    }

    // Imprimir los clasificados en la consola
    console.log("Clasificados:", clasificados);
  });
