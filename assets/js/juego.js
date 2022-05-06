// Patrón modulo 
(() => {

    'use strict'

    // Declaraciones
    let deck = [],
        puntosJugadores = [];
    const   tipos = ['C', 'D', 'H', 'S'],
            especiales = ['A', 'J', 'Q', 'K'];

    // Referencias HTML
    const   btnPedir = document.querySelector('#btn-pedir'),
            btnDetener = document.querySelector('#btn-detener'),
            btnNuevo = document.querySelector('#btn-nuevo'),
            puntosAcumulado =  document.querySelectorAll('small'),
            cartasJugadores = document.querySelectorAll('.cartas');

    // Se inicia el juego.
    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosAcumulado.forEach(elem => elem.innerText = 0);
        cartasJugadores.forEach(elem => elem.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Método para crear una baraja nueva. 
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++){
            for (const tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for (const especial of especiales){
            for (const tipo of tipos){
                deck.push(especial + tipo);
            }
        }

        // Se retorna el arreglo resultante, desordenado.
        return deck.sort(() => Math.random() - 0.4);
    };

    // Método para solicitar una carta de la baraja y eliminarla de la misma. 
    const pedirCarta = () => {

        if (deck.length === 0){
            throw 'Sin cartas en la baraja';
        }

        return deck.pop();
    };

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        let puntos = 0; 

        if (isNaN(valor)){
            if (valor === 'A'){
                puntos = 11;
            } else {
                puntos = 10;
            }
        } else {
            puntos = +valor; 
        }
        return puntos;
    };

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosAcumulado[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos){
                alert('¡Empate!');
            } else if(puntosMinimos > 21){
                alert('¡Computadora Gana!');
            }else if(puntosComputadora > 21){
                alert('¡Ganaste!');
            }else{
                alert('¡Computadora Gana!');
            }
        }, 20);

    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
           
        } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    };

    // Eventos
    btnPedir.addEventListener('click', () => {
        let puntosJugador = 0;

        const carta = pedirCarta();
        puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0); 


        if (puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        iniciarJuego();
    });

})();




