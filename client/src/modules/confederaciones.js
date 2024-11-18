export function insertarTablaConfederacion(confederacion, equipos) {
  // console.log(confederacion);

  const confederacionesDiv = document.querySelector(".faseConfederaciones");
  // console.log(confederacionesDiv);

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
    const notClasificated =
      index >= equipos.length - 2 ? "notClasificated" : "";

    html += `
            <tr class="${notClasificated}">
                <td>${index + 1}</td>
                <td class="team"><span class="up">⬆</span><span class="down">⬇</span><img src="${
                  equipo.flag
                }" alt="${equipo.name}" width="20"> ${equipo.name}</td>
            </tr>`;
  });

  html += `</tbody>
            </table>
        </div>`;

  // Inserta la tabla en la sección de confederaciones
  confederacionesDiv.insertAdjacentHTML("beforeend", html);
}
