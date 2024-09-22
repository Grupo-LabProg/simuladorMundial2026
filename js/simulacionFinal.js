// Array con los nombres de los equipos que deseas asignar
const teamNames = [
    'Argentina', 'Turquía', 'Francia', 'Alemania',
    'Italia', 'España', 'Inglaterra', 'Portugal',
    'Países Bajos', 'Bélgica', 'Uruguay', 'Croacia',
    'Colombia', 'Chile', 'Suecia', 'México',
    'Dinamarca', 'Suiza', 'Senegal', 'Ghana',
    'Nigeria', 'Japón', 'Corea del Sur', 'Australia',
    'Estados Unidos', 'Canadá', 'Costa Rica', 'Irán',
    'Arabia Saudita', 'Camerún', 'Serbia', 'Polonia',
    'Escocia', 'Brasil'
];

// Selecciona todos los divs con clase que empieza con 'team'
// const teams = document.querySelectorAll('[class^="team"]');

let button = document.getElementById('btn-simulation');

let teamsRound16 = document.querySelectorAll('.team1, .team2, .team3, .team4, .team5, .team6, .team7, .team8, .team9, .team10, .team11, .team12, .team13, .team14, .team15, .team16, .team17, .team18, .team19, .team20, .team21, .team22, .team23, .team24, .team25, .team26, .team27, .team28, .team29, .team30, .team31, .team32');

let teamsRound8 = document.querySelectorAll('.winner-d-knockout1, .winner-d-knockout2, .winner-d-knockout3, .winner-d-knockout4, .winner-d-knockout5, .winner-d-knockout6, .winner-d-knockout7, .winner-d-knockout8, .winner-d-knockout9, .winner-d-knockout10, .winner-d-knockout11, .winner-d-knockout12, .winner-d-knockout13, .winner-d-knockout14, .winner-d-knockout15, .winner-d-knockout16');

let teamsRound4 = document.querySelectorAll('.winner-o-knockout1, .winner-o-knockout2, .winner-o-knockout3, .winner-o-knockout4, .winner-o-knockout5, .winner-o-knockout6, .winner-o-knockout7, .winner-o-knockout8');

let teamsRound2 = document.querySelectorAll('.winner-c-knockout1, .winner-c-knockout2, .winner-c-knockout3, .winner-c-knockout4');

let teamsFinal = document.querySelectorAll('.winner-s-knockout1, .winner-s-knockout2');

let teamsThirdPlace = document.querySelectorAll('.looser-s-knockout1, .looser-s-knockout2');


// Recorre todos los equipos y asigna los nombres del array
button.addEventListener('click', () => {
    // Recorre todos los equipos y asigna los nombres del array
    teamsRound16.forEach((teamsRound16, index) => {
        teamsRound16.textContent = teamNames[index];
    });

    let arrayGanadores16vos = [16];
    for (let i = 1; i <= 16; i++) {
        let match = document.querySelector('.d-knockout' + i);
        let equipos = match.querySelectorAll('div');
        let winner = determinarGanador(equipos);

        winner.style.backgroundColor = 'green';

        equipos.forEach(team => {
            if (team !== winner) {
                team.style.backgroundColor = 'red';
            }
        });

        let ganador = winner.textContent;
        arrayGanadores16vos.push(ganador);
    }

    console.log('Ganadores 16vos');
    console.log(arrayGanadores16vos);

    teamsRound8.forEach((teamsRound8, index) => {
        teamsRound8.textContent = arrayGanadores16vos[index + 1];
    })

    let arrayGanadores8vos = [8];
    for (let i = 1; i <= 8; i++) {
        let match = document.querySelector('.o-knockout' + i);
        let equipos = match.querySelectorAll('div');
        let winner = determinarGanador(equipos);

        winner.style.backgroundColor = 'green';

        equipos.forEach(team => {
            if (team !== winner) {
                team.style.backgroundColor = 'red';
            }
        });

        let ganador = winner.textContent;

        arrayGanadores8vos.push(ganador);

    }

    console.log('Ganadores 8vos');
    console.log(arrayGanadores8vos);

    teamsRound4.forEach((teamsRound4, index) => {
        teamsRound4.textContent = arrayGanadores8vos[index + 1];
    })

    let arrayGanadores4tos = [4];
    for (let i = 1; i <= 4; i++) {
        let match = document.querySelector('.c-knockout' + i);
        let equipos = match.querySelectorAll('div');
        let winner = determinarGanador(equipos);

        winner.style.backgroundColor = 'green';

        equipos.forEach(team => {
            if (team !== winner) {
                team.style.backgroundColor = 'red';
            }
        });

        let ganador = winner.textContent;

        arrayGanadores4tos.push(ganador);

    }

    console.log('Ganadores 4tos');
    console.log(arrayGanadores4tos);

    teamsRound2.forEach((teamsRound2, index) => {
        teamsRound2.textContent = arrayGanadores4tos[index + 1];
    })

    let arrayGanadoresSemis = [2];
    for (let i = 1; i <= 2; i++) {
        let match = document.querySelector('.s-knockout' + i);
        let equipos = match.querySelectorAll('div');
        let winner = determinarGanador(equipos);

        winner.style.backgroundColor = 'green';

        equipos.forEach(team => {
            if (team !== winner) {
                team.style.backgroundColor = 'red';
            }
        });

        let ganador = winner.textContent;

        arrayGanadoresSemis.push(ganador);

    }

    const arrayPerdedoresSemis = arrayGanadores4tos.filter(element => !arrayGanadoresSemis.includes(element));

    console.log('Ganadores Semis');
    console.log(arrayGanadoresSemis);

    console.log('Perdedores Semis');
    console.log(arrayPerdedoresSemis);

    teamsThirdPlace.forEach((teamsThirdPlace, index) => {
        teamsThirdPlace.textContent = arrayPerdedoresSemis[index + 1];
    })


    let thirdPlace = document.querySelector('.f-third');
    let equipos = thirdPlace.querySelectorAll('div');
    let winner = determinarGanador(equipos);
    winner.style.backgroundColor = 'green';
    equipos.forEach(team => {
        if (team !== winner) {
            team.style.backgroundColor = 'red';
        }
    });

    let final = document.querySelector('.f-final');
    equipos = final.querySelectorAll('div');
    winner = determinarGanador(equipos);
    winner.style.backgroundColor = 'green';
    equipos.forEach(team => {
        if (team !== winner) {
            team.style.backgroundColor = 'red';
        }
    });

    teamsFinal.forEach((teamsFinal, index) => {
        teamsFinal.textContent = arrayGanadoresSemis[index + 1];
    })

});


function determinarGanador(equipos) {
    // Elige un índice aleatorio: 0 para el primer equipo, 1 para el segundo equipo
    let ganadorIndex = Math.floor(Math.random() * equipos.length);

    // Retorna el elemento del equipo ganador
    return equipos[ganadorIndex];
}

