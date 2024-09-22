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


// Asignar nombres de equipos a una ronda
function asignarEquipos(rondaEquipos, ganadores) {
    rondaEquipos.forEach((equipo, index) => {
        equipo.textContent = ganadores[index];
    });
}

function determinarGanador(equipos) {
    // Elige un índice aleatorio: 0 para el primer equipo, 1 para el segundo equipo
    let ganadorIndex = Math.floor(Math.random() * equipos.length);

    // Retorna el elemento del equipo ganador
    return equipos[ganadorIndex];
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function procesarRonda(clasePartido, numPartidos) {
    let ganadores = [];
    for (let i = 1; i <= numPartidos; i++) {
        let match;
        if (clasePartido === 'f-final') {
            match = document.querySelector('.f-final');
        } else if (clasePartido === 'f-third') {
            match = document.querySelector('.f-third');
        } else {
            match = document.querySelector(`.${clasePartido}${i}`);
        }

        let equipos = match.querySelectorAll('div');
        let winner = determinarGanador(equipos);

        winner.style.backgroundColor = 'green';
        equipos.forEach(team => {
            if (team !== winner) {
                team.style.backgroundColor = 'red';
            }
        });

        ganadores.push(winner.textContent);

        // Espera 1 segundo (1000 ms) antes de continuar a la siguiente iteración
        await delay(1000);
        console.log("clase partido: " + clasePartido)
    }
    return ganadores;
}


button.addEventListener('click', async () => {
    let teams = document.querySelectorAll('[class^="team"]');
    teams.forEach((equipo) => {
        equipo.style.backgroundColor = '#4b4a4a';
    });

    // Asignar equipos de la primera ronda (16vos)
    teamsRound16.forEach((equipo, index) => {
        equipo.textContent = teamNames[index];
    });

    // Procesar cada ronda
    let ganadores16vos = await procesarRonda('d-knockout', 16);
    console.log('Ganadores 16vos:', ganadores16vos);
    asignarEquipos(teamsRound8, ganadores16vos);

    let ganadores8vos = await procesarRonda('o-knockout', 8);
    console.log('Ganadores 8vos:', ganadores8vos);
    asignarEquipos(teamsRound4, ganadores8vos);

    let ganadores4tos = await procesarRonda('c-knockout', 4);
    console.log('Ganadores 4tos:', ganadores4tos);
    asignarEquipos(teamsRound2, ganadores4tos);

    let ganadoresSemis = await procesarRonda('s-knockout', 2);
    console.log('Ganadores Semis:', ganadoresSemis);

    let perdedoresSemis = ganadores4tos.filter(element => !ganadoresSemis.includes(element));
    console.log('Perdedores Semis:', perdedoresSemis);

    asignarEquipos(teamsThirdPlace, perdedoresSemis);

    // Procesar tercer lugar
    await procesarRonda('f-third', 1);

    // Asignar finalistas
    asignarEquipos(teamsFinal, ganadoresSemis);

    // Procesar final
    await procesarRonda('f-final', 1);
});
