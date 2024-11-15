export function sorteo(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export let sorteoSimulado = false;
export function insertarTabla(grupo, equipos) {
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
