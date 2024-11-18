function getRandomScore() {
    return Math.floor(Math.random() * 5); // Genera un número entre 0 y 4
}

document.addEventListener("DOMContentLoaded", () => {
    const winners = JSON.parse(localStorage.getItem("ganadores16vos"));
    const imgHTML = JSON.parse(localStorage.getItem("misDatos"));

    if (winners && imgHTML) {
        document.getElementById('recordSection').style.display = 'block';
        // console.log("mis datos:", imgHTML);
        // console.log("Ganadores de 16vos:", winners);

        const countryNames = winners.map(winner => {
            const match = winner.match(/alt="([^"]+)"/);
            return match ? match[1] : null; // Devolver el nombre del país
        }).filter(Boolean); // Filtrar nulls
        const gameElements = document.querySelectorAll('.game_results');

        gameElements.forEach((game, index) => {


            const score1 = getRandomScore();
            const score2 = getRandomScore();

            // Inicializa los índices de los países
            const country1Index = index * 2;//pares 0 2 4
            const country2Index = index * 2 + 1;//impares 1 3 5

            // Determinar quién es el ganador
            const winnerName1 = imgHTML[country1Index].match(/alt="([^"]+)"/)[1];
            const winnerName2 = imgHTML[country2Index].match(/alt="([^"]+)"/)[1];

            let result_1, result_2;

            if (countryNames.includes(winnerName1) && !countryNames.includes(winnerName2)) {
                result_1 = Math.max(score1, score2) + 1; // Asignar mayor puntaje al ganador
                result_2 = Math.min(score1, score2);
            } else if (countryNames.includes(winnerName2) && !countryNames.includes(winnerName1)) {
                result_2 = Math.max(score1, score2) + 1;
                result_1 = Math.min(score1, score2);
            } else {
                // Si ambos son ganadores o ninguno es ganador, asignar puntajes aleatorios nunca ingresa igual
                result_1 = Math.max(score1, score2) + 1;
                result_2 = Math.min(score1, score2);
            }
            // console.log("W:", result_1, "L:", result_2);
            // Actualizar puntajes en el HTML
            game.querySelector('.content-result .result_1').innerText = result_1;
            game.querySelector('.content-result .result_2').innerText = result_2;

            // Extraer solo la imagen sin texto alternativo ni otros elementos
            const imgTag1 = imgHTML[country1Index].match(/<img[^>]+>/)[0]; // Solo la etiqueta <img>
            const imgTag2 = imgHTML[country2Index].match(/<img[^>]+>/)[0]; // Solo la etiqueta <img>
            
            // Insertar solo la imagen dentro del div content-img-flag
            game.querySelector('.two .content-img-flag').innerHTML = imgTag1;
            game.querySelector('.one .content-img-flag').innerHTML = imgTag2;

            // Asignar los nombres de los países a los elementos .name_flag
            game.querySelector('.two .name_flag').textContent = winnerName1;
            game.querySelector('.one .name_flag').textContent = winnerName2;
        });

    } else {

        // console.log("No hay ganadores de 16vos disponibles.");
    }
});


