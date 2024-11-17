export function simularResultados(equipos) {
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

      if (equipos[i].name === "Argentina" || equipos[j].name === "Argentina") {
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

export function simularFaseDeGrupos(grupo, equipos) {
  equipos.sort((a, b) => {
    if (b.Pts === a.Pts) {
      return b.DG - a.DG;
    }
    return b.Pts - a.Pts;
  });

  const faseGrupos = document.querySelector(".grupos");

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
