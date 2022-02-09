const milissegundo = document.querySelector('.milissegundo');
const segundo = document.querySelector('.segundo');
const minuto = document.querySelector('.minuto');
const hora = document.querySelector('.hora');
let cronometro;

let milissegundos = 0
let segundos = 0
let minutos = 0
let horas = 0


function timer() {
    milissegundos = milissegundos + 10

    if (milissegundos > 1000) {
        milissegundos = 0;
        segundos++;
    }
    if (segundos > 60) {
        segundos = 0;
        minutos++;
    }
    if (minutos == 60) {
        minutos = 0;
        horas++;
    }

    imprimirNaTela()
}

function start() {
    pause()
    cronometro = setInterval(() => { timer() }, 10)
}

function pause() {
    clearInterval(cronometro)
}

function reset() {
    milissegundos = 0
    segundos = 0
    minutos = 0
    horas = 0

    imprimirNaTela()
}

function imprimirNaTela() {
    milissegundo.textContent = `${milissegundos}`
    segundo.textContent = `${segundos}`
    minuto.textContent = `${minutos}`
    hora.textContent = `${horas}`
}