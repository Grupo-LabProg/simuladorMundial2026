let equiposMundial2022 = [];
let equipos;

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

// * Función para cargar equipos desde la API y mostrarlos en la página

async function cargarEquipos() {
  try {
    const response = await fetch("http://localhost:3000/api/equipos");

    // obtengo el objeto JSON de la respuesta de la API y lo parseo
    equipos = await response.json();

    // Itera sobre el objeto equipos y va seteando cada país en el arreglo de equiposMundial2022
    Object.values(equipos).forEach((confederacion) => {
      confederacion.forEach((pais) => {
        equiposMundial2022.push(pais); // Agregar cada país al arreglo final
      });
    });
    // console.log("equipos mundial 2022: ", equiposMundial2022);
    // console.log("equipos: ", equipos);
  } catch (error) {
    console.error("Error al cargar equipos:", error);
  }
}
// Llama a la función al cargar la página
await cargarEquipos();

// console.log("Supuestamente se ejecutaría dsp de cargar los equipos");
// console.log("Equipos mundial 2022: ", equiposMundial2022);

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
    const confederaciones = equipos;

    // Limpiar el contenido previo
    const faseConfederacionesDiv = document.getElementById(
      "faseConfederaciones"
    );
    faseConfederacionesDiv.innerHTML = "";
    // console.log(confederaciones);
    // Insertar cada confederación como si fuera un grupo
    // console.log("Antes del bucle for que inserta confederaciones");
    for (const confederacion in confederaciones) {
      const equipos = confederaciones[confederacion];
      // console.log("Equipos: ", equipos);
      insertarTablaConfederacion(confederacion, equipos); // Aquí invocamos la función de insertar tabla
    }
  });

document
  .getElementById("guardarClasificadosBtn")
  .addEventListener("click", function () {
    console.log("Se dio al boton guardar");
    const confederaciones = document.querySelectorAll(".tabla-confederacion");
    console.log(confederaciones);

    // Crear un objeto vacío para almacenar los equipos por confederación
    let clasificados = {};

    confederaciones.forEach((confederacion) => {
      // Obtener el nombre de la confederación
      const nombreConfederacion = confederacion
        .querySelector("h3")
        .textContent.trim()
        .split(":")[1]
        ?.trim();

      console.log(nombreConfederacion);

      const equipos = confederacion.querySelectorAll("td.team");

      // Filtramos todos los equipos excepto los últimos dos
      const equiposFiltrados = Array.from(equipos).slice(0, equipos.length - 2); // Convierte NodeList a Array y excluye los dos últimos equipos

      clasificados[nombreConfederacion] = [];

      // Recorremos los equipos filtrados y extraemos el nombre y la URL de la bandera
      equiposFiltrados.forEach((equipo) => {
        const nombre = equipo.textContent.trim().split(" ")[1]; // Obtener el nombre del equipo
        const bandera = equipo.querySelector("img").src; // Obtener el src de la imagen de la bandera
        // Guardamos el equipo en el formato deseado
        clasificados[nombreConfederacion].push({
          name: nombre,
          flag: bandera,
        });
      });
    });

    console.log(clasificados);
    enviarDatosAlServidor(clasificados);
  });

function enviarDatosAlServidor(equipos) {
  // Usamos fetch para enviar los datos al servidor
  fetch("http://localhost:3000/api/equipos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ equipos: equipos }), // Convertir el array de equipos a JSON
  })
    .then((response) => response.json()) // Respuesta del servidor
    .then((data) => {
      console.log("Respuesta del servidor:", data);
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
    });
}

document
  .getElementById("faseConfederaciones")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("up")) {
      console.log('Se hizo clic en la flecha "⬆"');
      const fila = event.target.closest("tr");
      const filaAnterior = fila.previousElementSibling;

      const equipo1 = fila.querySelector("td.team");
      const equipo2 = filaAnterior.querySelector("td.team");

      // Elimino los <td> de sus posiciones actuales:
      fila.removeChild(equipo1);
      filaAnterior.removeChild(equipo2);

      // Inserto los <td> en las posiciones correspondientes:
      fila.insertBefore(equipo2, fila.lastChild); // equipo2 en la fila actual
      filaAnterior.insertBefore(equipo1, filaAnterior.lastChild); // equipo1 en la fila anterior
    } else if (event.target.classList.contains("down")) {
      console.log('Se hizo clic en la flecha "⬇"');
      const fila = event.target.closest("tr");
      const filaPosterior = fila.nextElementSibling;

      const equipo1 = fila.querySelector("td.team");
      const equipo2 = filaPosterior.querySelector("td.team");

      // Elimino los <td> de sus posiciones actuales:
      fila.removeChild(equipo1);
      filaPosterior.removeChild(equipo2);

      // Inserto los <td> en las posiciones correspondientes:
      fila.insertBefore(equipo2, null); // equipo2 al final de la fila actual
      filaPosterior.insertBefore(equipo1, null); // equipo1 al final de la fila posterior
    }
  });

//   //eliminar despues de armar el servidor
// document
//   .getElementById("mostrarConfederacionesBtn")
//   .addEventListener("click", function () {
//     const confederaciones = {
//       CAF: CAF,
//       CONMEBOL: CONMEBOL,
//       CONCACAF: CONCACAF,
//       AFC: AFC,
//       UEFA: UEFA,
//       OFC: OFC,
//     };

//     // Limpiar el contenido previo
//     const faseConfederacionesDiv = document.getElementById(
//       "faseConfederaciones"
//     );
//     faseConfederacionesDiv.innerHTML = "";

//     // Insertar cada confederación como si fuera un grupo
//     for (const confederacion in confederaciones) {
//       const equipos = confederaciones[confederacion];
//       insertarTablaConfederacion(confederacion, equipos); // Aquí invocamos la función de insertar tabla
//     }
//   });
