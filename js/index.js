import { equiposMundial2022 } from "./paises.js";

function hideNavMenu() {
  if (window.innerWidth <= 800) {
    document.getElementById("nav_check").checked = false;
  }
}

document.querySelectorAll("nav .link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const target = link.getAttribute("data-target");

    document.querySelectorAll(".content").forEach((section) => {
      section.classList.remove("active");
    });

    if (target) {
      document.querySelector(`.${target}`).classList.add("active");
      hideNavMenu();
    }
  });
});

function sorteo(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function insertarTabla(grupo, equipos) {
  const gruposDiv = document.querySelector(".grupos");
  const faseGrupos = document.querySelector(".faseDegrupos");

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

  faseGrupos.insertAdjacentHTML("beforeend", html);
  gruposDiv.insertAdjacentHTML("beforeend", html);
}

function simularResultados(equipos) {
  equipos.forEach((equipo) => {
    equipo.PJ = 3;
    equipo.G = Math.floor(Math.random() * 4);
    equipo.E = Math.floor(Math.random() * (3 - equipo.G));
    equipo.P = 3 - (equipo.G + equipo.E);
    equipo.GF = equipo.G * (Math.floor(Math.random() * 4) + 1);
    equipo.GC = equipo.P * (Math.floor(Math.random() * 4) + 1);
    equipo.DG = equipo.GF - equipo.GC;
    equipo.Pts = equipo.G * 3 + equipo.E;

    equipo.circles = [];
    for (let i = 0; i < equipo.G; i++) {
      equipo.circles.push("win");
    }
    for (let i = 0; i < equipo.E; i++) {
      equipo.circles.push("draw");
    }
    for (let i = 0; i < equipo.P; i++) {
      equipo.circles.push("loss");
    }
  });
}

function simularFaseDeGrupos(grupo, equipos) {
  equipos.sort((a, b) => {
    if (b.Pts === a.Pts) {
      return b.DG - a.DG;
    }
    return b.Pts - a.Pts;
  });

  const faseGrupos = document.querySelector(".faseDegrupos");

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
  equipos.forEach((equipo, index) => {
    html += `
          <tr>
              <td>${index + 1}</td>
              <td class="team">
                <img src="${equipo.flag}" alt="${equipo.name}" width="20">
                ${equipo.name}
              </td>
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

  faseGrupos.insertAdjacentHTML("beforeend", html);
}

document
  .getElementById("simularSorteoGruposBtn")
  .addEventListener("click", function () {
    sorteo(equiposMundial2022);

    const grupos = {};
    const letras = "ABCDEFGHIJKL";

    for (let i = 0; i < letras.length; i++) {
      grupos[letras[i]] = equiposMundial2022.slice(i * 4, i * 4 + 4);
    }

    const gruposDiv = document.getElementById("grupos");
    gruposDiv.innerHTML = "";
    const faseGrupos = document.getElementById("faseGrupos");
    faseGrupos.innerHTML = "";
    for (const grupo in grupos) {
      insertarTabla(grupo, grupos[grupo]);
    }

    console.log(grupos);
  });

document
  .getElementById("simularGruposBtn")
  .addEventListener("click", function () {
    const grupos = {};
    const letras = "ABCDEFGHIJKL";

    for (let i = 0; i < letras.length; i++) {
      grupos[letras[i]] = equiposMundial2022.slice(i * 4, i * 4 + 4);
    }

    const faseGrupos = document.getElementById("faseGrupos");
    faseGrupos.innerHTML = "";

    const clasificados = [];

    for (const grupo in grupos) {
      simularResultados(grupos[grupo]);
      simularFaseDeGrupos(grupo, grupos[grupo]);
      const equipo1 = grupos[grupo][0]
      const equipo2 = grupos[grupo][1]
      
      clasificados.push(`<td class="team"> <img src="${equipo1.flag}" alt="${equipo1.name}" width="20">${equipo1.name}</td>`);
      clasificados.push(`<td class="team"> <img src="${equipo2.flag}" alt="${equipo2.name}" width="20">${equipo2.name}</td>`);
    }

    const mejoresTerceros = [];
    for (let i = 0; i < letras.length; i++) {
      const equipoTercero = grupos[letras[i]][2];
      mejoresTerceros.push(`<td class="team"> <img src="${equipoTercero.flag}" alt="${equipoTercero.name}" width="20">${equipoTercero.name}</td>`);
    }

    mejoresTerceros.sort((a, b) => {
      if (b.Pts === a.Pts) {
        return b.DG - a.DG;
      }
      return b.Pts - a.Pts;
    });

    for (let i = 0; i < 8; i++) {
      clasificados.push(mejoresTerceros[i]);
    }
    //ver cada equipo claficado
    for (let i = 0; i < clasificados.length; i++) {
      console.log(clasificados[i]);
    }
   // console.log("Clasificados:", clasificados);
  });
