const btnStart = document.querySelector('.start')
const btnConfiguracoes = document.querySelector('.btnconfiguracoes')
const divConfiguracoes = document.querySelector('.configuracoes')
const container = document.querySelector('.container')
const divFinal = document.querySelector('.fim-de-jogo')
const body = document.querySelector('body')
const contagemAcertos = document.querySelector('.contagem-acertos')
const contagemHS = document.querySelector('.contagem-hs')
const contagemTempo = document.querySelector('.contagem-tempo')
const acertos = document.querySelector('.n-acerto')
const numHeadshot = document.querySelector('.n-headshot')
const temporizador = document.querySelector('.n-tempo')
const target = document.querySelector('.target')
const inputDificuldade = document.querySelectorAll('input[name="dificuldade"]')

let tempoInicial = 10
let dificuldadeSetada = 'facil'
let numacertos = 0
let numHs = 0
let showTarget
let timer

const dificuldade = {
    'facil': 2000,
    'medio': 1500,
    'dificil': 1000,
    'Extreme': 500
}

const tabelaTempo = {
    '10': 10,
    '30': 30,
    '60': 60,
    'Extreme': 500
}

const cores = {
    '10': ['amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'amarelo', 'vermelho', 'azul', 'verde', 'laranja'],
    '20': ['amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano'],
    '30': ['amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano', 'preto', 'branco', 'lilas', 'bege', 'salmao', 'preto', 'branco', 'lilas', 'bege', 'salmao'],
}

function sortearcores(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}

function openConfig() {
    return divConfiguracoes.style.display !== 'inline' ? divConfiguracoes.style.display = 'inline' : divConfiguracoes.style.display = 'none'
}

function selectDificuldade(event) {
    dificuldadeSetada = event.target.value
}

function selectTempo(event) {
    console.log(event.target.value)
}


function createGame() {

    btnStart.remove()
    btnConfiguracoes.remove()
    contagemAcertos.style.opacity = 1
    contagemTempo.style.opacity = 1
    contagemHS.style.opacity = 1
    divConfiguracoes.style.display = 'none'
    container.style.display = 'flex'
    showTarget = setInterval(() => { createTarget() }, dificuldade[dificuldadeSetada])
    timer = setInterval(() => { reduceTimer() }, 1000)

    function createTarget() {
        const elementTarget = document.createElement('div')
        const elementHeadShot = document.createElement('div')

        elementTarget.classList.add('target')
        elementHeadShot.classList.add('headshot')

        let topPosition = Math.random() * 60
        let leftPosition = Math.random() * 80

        body.style.setProperty('--top', `${topPosition}vh`)
        body.style.setProperty('--left', `${leftPosition}vw`)

        elementTarget.append(elementHeadShot)
        container.append(elementTarget)

        elementTarget.addEventListener('click', shotTarget)
        elementHeadShot.addEventListener('click', shotHeadShot)

        setTimeout(() => { elementTarget.remove() }, dificuldade[dificuldadeSetada] / 2)
    }

    function shotTarget() {
        const elementTarget = document.querySelector('.target')
        if (elementTarget.getAttribute('data-kill')) return

        numacertos++
        acertos.textContent = `${numacertos}`

        elementTarget.setAttribute('data-kill', true)
    }

    function shotHeadShot() {
        const divHeadShot = document.querySelector('.div-headshot')
        const txtHeadShot = document.createElement('div')

        txtHeadShot.classList.add('txtHeadShot')
        txtHeadShot.textContent = `HEADSHOT!!`
        divHeadShot.append(txtHeadShot)
        divHeadShot.style.opacity = 1

        setTimeout(() => { txtHeadShot.remove() }, dificuldade[dificuldadeSetada] / 2)
        setTimeout(() => { divHeadShot.style.opacity = 0 }, dificuldade[dificuldadeSetada] / 2)

        numHs++
        numHeadshot.textContent = `${numHs}`
    }


    function reduceTimer() {
        const inputTempo = document.querySelector('input[name="tempo"]:checked')

        inputTempo.value--
        temporizador.textContent = `${inputTempo.value}`

        AnunciarOFim()
    }

    function AnunciarOFim() {
        if (temporizador.textContent <= '0') {
            const jogarNovamente = document.createElement('button')
            const fim = document.createElement('p'
            )
            fim.textContent = 'Fim de Jogo'
            jogarNovamente.textContent = 'Jogar novamente'
            divFinal.append(fim, jogarNovamente)
            divFinal.style.opacity = 1
            container.style.opacity = 0.4

            function refreshPage() {
                window.location.reload();
            }

            const button = document.querySelector('button')
            button.addEventListener('click', refreshPage)

            clearInterval(showTarget)
            clearInterval(timer)
        }
    }

}

inputDificuldade.forEach(input => {
    input.addEventListener('change', selectDificuldade)
});


btnConfiguracoes.addEventListener('click', openConfig)
btnStart.addEventListener('click', createGame)