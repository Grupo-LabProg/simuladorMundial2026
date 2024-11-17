let items = [];
let practica2 = []
let practica = [
  {
    id: 1,
    country: "Ucrania",
    flag: "https://flagcdn.com/w80/ua.png",
    point: 10
  },
  {
    id: 2,
    country: "Rusia",
    flag: "https://flagcdn.com/w80/ru.png",
    point: 8
  },
  {
    id: 3,
    country: "Brasil",
    flag: "https://flagcdn.com/w80/br.png",
    point: 6
  },
  {
    id: 4,
    country: "Chile",
    flag: "https://flagcdn.com/w80/cl.png",
    point: 5
  }
];


function rellenar() {
  try {
    console.log("Ingreso");
    // Añadir los elementos de practica al arreglo items
    practica.forEach(valor => {
      items.push(valor);
    });
    const labelscontent = document.querySelector('.label-content');
    const errorDiv = document.querySelector('.error-message');
    if (items.length == 0) {
      errorDiv.style.display = 'block'; // Mostramos el mensaje
      labelscontent.style.display = 'none'; 
      console.log("El arreglo está vacío.");
    } else {
      console.log("El arreglo no está vacío.");
      errorDiv.style.display = 'none';
      labelscontent.style.display = 'flex';
      const container = document.querySelector('.content-table');

      // Verificar si el contenedor existe
      if (container) {
        // Recorrer el arreglo de datos
        items.forEach(item => {
          // Crear un div para cada item
          const itemElement = document.createElement('div');
          itemElement.classList.add('item');

          // Crear los elementos internos (rank, country, points)
          const rankElement = document.createElement('span');
          rankElement.classList.add('rank-id');
          rankElement.textContent = item.id;

          const countryElement = document.createElement('span');
          countryElement.classList.add('name-country');
          countryElement.textContent = item.country;

          const flagImage = document.createElement('img');
          flagImage.src = item.flag;
          flagImage.alt = `img-country-${item.country}`;

          const pointsElement = document.createElement('span');
          pointsElement.classList.add('points');
          pointsElement.textContent = item.point;

          // Agregar los elementos creados al div item
          itemElement.appendChild(rankElement);
          itemElement.appendChild(countryElement);
          itemElement.appendChild(flagImage);
          itemElement.appendChild(pointsElement);

          // Finalmente, agregar el div item al contenedor
          container.appendChild(itemElement);
        });
      } else {
        console.error("No se encontró el contenedor .content-table");
      }
    }
  } catch (error) {
    console.error("Error al cargar equipos:", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  rellenar();  // Llama a la función que rellena la página
});
