import {
  equiposMundial2022,
  AFC,
  CAF,
  CONCACAF,
  UEFA,
  CONMEBOL,
  OFC,
} from "../server/data/paises.js";

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

function insertarTablaConfederacion(confederacion, equipos) {
  const confederacionesDiv = document.querySelector(".faseConfederaciones");

  let html = `
      <div class="tabla-confederacion">
          <h3>Confederación: ${confederacion}</h3>
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Equipo</th>
                  </tr>
              </thead>
              <tbody>`;

  equipos.forEach((equipo, index) => {
    html += `
          <tr>
              <td>${index + 1}</td>
              <td class="team"><img src="${equipo.flag}" alt="${
      equipo.name
    }" width="20"> ${equipo.name}</td>
          </tr>`;
  });

  html += `</tbody>
          </table>
      </div>`;

  // Inserta la tabla en la sección de confederaciones
  confederacionesDiv.insertAdjacentHTML("beforeend", html);
}

let sorteoSimulado = false;
function insertarTabla(grupo, equipos) {
  const gruposDiv = document.querySelector(".grupos");
  const faseGrupos = document.querySelector(".faseDegrupos");
  sorteoSimulado = true;
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
    equipo.G = 0; 
    equipo.E = 0; 
    equipo.P = 0; 
    equipo.GF = 0; 
    equipo.GC = 0; 
  });


  for (let i = 0; i < equipos.length; i++) {
    for (let j = i + 1; j < equipos.length; j++) {
      let resultado;
      let golesEquipoI = Math.floor(Math.random() * 4) + 1;
      let golesEquipoJ = Math.floor(Math.random() * 4) + 1;

      if (
        equipos[i].name === "Argentina" ||
        equipos[j].name === "Argentina"
      ) {
        let probabilidad = Math.random();
        //console.log(probabilidad)
        if (probabilidad < 0.95) {
          resultado = equipos[i].name === "Argentina" ? 1 : 2;
        } else {
          resultado = 0;
        }
      } else {
        resultado = Math.floor(Math.random() * 3); 
      }

      if (resultado === 0) {

        equipos[i].E++;
        equipos[j].E++;
        equipos[i].GF += golesEquipoI;
        equipos[j].GF += golesEquipoI;
        equipos[i].GC += golesEquipoI;
        equipos[j].GC += golesEquipoI;
      } else if (resultado === 1) {
       
        equipos[i].G++;
        equipos[j].P++;
        equipos[i].GF += golesEquipoI;
        equipos[i].GC += golesEquipoJ;
        equipos[j].GF += golesEquipoJ;
        equipos[j].GC += golesEquipoI;
      } else {
        
        equipos[j].G++;
        equipos[i].P++;
        equipos[j].GF += golesEquipoJ;
        equipos[j].GC += golesEquipoI;
        equipos[i].GF += golesEquipoI;
        equipos[i].GC += golesEquipoJ;
      }
    }
  }

 
  equipos.forEach((equipo) => {
    equipo.PJ = 3; 
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

localStorage.removeItem("clasificados"); // borra el arreglo clasificados del local storage cuando recarga la pagina

document
  .getElementById("simularGruposBtn")
  .addEventListener("click", function () {
    if (sorteoSimulado) {
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

        const equipo1 = grupos[grupo][0];
        const equipo2 = grupos[grupo][1];

        clasificados.push(
          `<td class="team"> <img src="${equipo1.flag}" alt="${equipo1.name}" width="20">${equipo1.name}</td>`
        );
        clasificados.push(
          `<td class="team"> <img src="${equipo2.flag}" alt="${equipo2.name}" width="20">${equipo2.name}</td>`
        );
      }

      const mejoresTerceros = [];
      for (let i = 0; i < letras.length; i++) {
        const equipoTercero = grupos[letras[i]][2];
        mejoresTerceros.push(
          `<td class="team"> <img src="${equipoTercero.flag}" alt="${equipoTercero.name}" width="20">${equipoTercero.name}</td>`
        );
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
      /*for (let i = 0; i < clasificados.length; i++) {
        console.log(clasificados[i]);
      }*/
      // console.log("Clasificados:", clasificados);

      localStorage.setItem("clasificados", JSON.stringify(clasificados));
    } else {
      Swal.fire({
        title: "¡Falta simular el sorteo de grupos!",
        color: "#000000",
        icon: "error",
        confirmButtonColor: "#000000", 
      });
    }
  });

document
  .getElementById("mostrarConfederacionesBtn")
  .addEventListener("click", function () {
    const confederaciones = {
      CAF: CAF,
      CONMEBOL: CONMEBOL,
      CONCACAF: CONCACAF,
      AFC: AFC,
      UEFA: UEFA,
      OFC: OFC,
    };

    // Limpiar el contenido previo
    const faseConfederacionesDiv = document.getElementById(
      "faseConfederaciones"
    );
    faseConfederacionesDiv.innerHTML = "";

    // Insertar cada confederación como si fuera un grupo
    for (const confederacion in confederaciones) {
      const equipos = confederaciones[confederacion];
      insertarTablaConfederacion(confederacion, equipos); // Aquí invocamos la función de insertar tabla
    }
  });
