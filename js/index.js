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
    }
  });
});

function insertarTabla() {
  const grupos = document.querySelector(".grupos"); // Contenedor donde se insertará la tabla

  // Estructura HTML de la tabla
  let html = `
    <div class="table-container">
      <table>
        <thead>
          <p>Grupo A</p>
          <tr>
            <th>#</th> <!-- Nueva columna para el número del equipo -->
            <th>Equipo</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
            <th>Pts</th>
            <th>Últimos 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td> <!-- Número de equipo -->
            <td class="team"><img src="https://flagcdn.com/w20/nl.png" alt="Países Bajos">Países Bajos</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><span class="circle default"></span><span class="circle default"></span><span class="circle default"></span></td>
          </tr>
          <tr>
            <td>2</td> <!-- Número de equipo -->
            <td class="team"><img src="https://flagcdn.com/w20/sn.png" alt="Senegal"> Senegal</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><span class="circle default"></span><span class="circle default"></span><span class="circle default"></span></td>
          </tr>
          <tr>
            <td>3</td> <!-- Número de equipo -->
            <td class="team"><img src="https://flagcdn.com/w20/ec.png" alt="Ecuador"> Ecuador</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><span class="circle default"></span><span class="circle default"></span><span class="circle default"></span></td>
          </tr>
          <tr>
            <td>4</td> <!-- Número de equipo -->
            <td class="team"><img src="https://flagcdn.com/w20/qa.png" alt="Catar"> Catar</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><span class="circle default"></span><span class="circle default"></span><span class="circle default"></span></td>
          </tr>
        </tbody>
      </table>
    </div>`;

  // Insertar el HTML en el contenedor
  grupos.insertAdjacentHTML("beforeend", html);
}

// Llamar a la función para insertar la tabla
for (let i = 0; i < 12; i++) {
  insertarTabla();
}
