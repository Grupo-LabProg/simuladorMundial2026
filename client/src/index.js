  //eliminar despues de armar el servidor
import {
  equiposMundial2022,
  AFC,
  CAF,
  CONCACAF,
  UEFA,
  CONMEBOL,
  OFC,
} from "./modules/paises.js";

import {
  sorteo,
  insertarTabla,
  sorteoSimulado,
} from "./modules/simulacionSorteo.js";
import { insertarTablaConfederacion } from "./modules/confederaciones.js";
import {
  simularResultados,
  simularFaseDeGrupos,
} from "./modules/simulacionFaseGrupos.js";

// client/index.js
//let AFC;
//let CAF;
//let CONCACAF;
//let UEFA;
//let CONMEBOL;
//let OFC;
//let equipos;
// Función para cargar equipos desde la API y mostrarlos en la página

async function cargarEquipos() {
  try {
    // const response = await fetch('/api/equipos');
    const response = await fetch("http://localhost:3000/api/equipos");

    const equipos = await response.json();
    // Aquí, renderiza los equipos en el HTML, mostrando los nombres y banderas
    console.log(equipos);
    AFC = equipos.AFC;
    CAF = equipos.CAF;
    CONCACAF = equipos.CONCACAF;
    UEFA = equipos.UEFA;
    CONMEBOL = equipos.CONMEBOL;
    OFC = equipos.OFC;
  } catch (error) {
    console.error("Error al cargar equipos:", error);
  }
}
// Llama a la función al cargar la página
//cargarEquipos();

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

    //console.log(grupos);
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
    const confederaciones = this.equipos;

    // Limpiar el contenido previo
    const faseConfederacionesDiv = document.getElementById(
      "faseConfederaciones"
    );
    faseConfederacionesDiv.innerHTML = "";
    console.log(confederaciones);
    // Insertar cada confederación como si fuera un grupo
    for (const confederacion in confederaciones) {
      const equipos = confederaciones[confederacion];
      insertarTablaConfederacion(confederacion, equipos); // Aquí invocamos la función de insertar tabla
    }
  });

  //eliminar despues de armar el servidor
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
