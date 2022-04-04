const input = document.querySelector('select')
const container = document.querySelector('.container')
const divFinal = document.querySelector('.fim-de-jogo')
const body = document.querySelector('body')
const contagem = document.querySelector('.contagem')
const jogadas = document.querySelector('span')
let numJogadas = 0

const cores = {
    '10': ['amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'amarelo', 'vermelho', 'azul', 'verde', 'laranja'],
    '20': ['amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano'],
    '30': ['amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'amarelo', 'vermelho', 'azul', 'verde', 'laranja', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano', 'marrom', 'violeta', 'rosa', 'verdeclaro', 'ciano', 'preto', 'branco', 'lilas', 'bege', 'salmao', 'preto', 'branco', 'lilas', 'bege', 'salmao'],
}

function sortearcores(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}


function createGame() {
    input.style.display = 'none'
    contagem.style.opacity = '1'
    jogadas.textContent = `${numJogadas}`

    for (let i = 0; i < input.value; i++) {
        const divBox = document.createElement('div')
        divBox.classList.add('box')
        container.append(divBox)
    }
    sortearcores(cores[input.value])

    if (input.value === '20') {
        body.style.setProperty('--size', '150px')
        body.style.setProperty('--gap', '30px')
    }

    if (input.value === '30') {
        body.style.setProperty('--size', '100px')
        body.style.setProperty('--gap', '20px')
    }

    const boxes = document.querySelectorAll('.box')
    let i = 0
    boxes.forEach(box => {
        box.setAttribute('data-id', `${cores[input.value][i]}`)
        box.setAttribute('data-cartaVirada', `nao`)
        i++
    })

    function virar(event) {
        let quantidadeCartaVirada = 0

        boxes.forEach(box => {
            box.getAttribute('data-cartaVirada') === 'sim' ? quantidadeCartaVirada++ : ''
        })


        if (!event.target.classList.contains('virar') && quantidadeCartaVirada < 2) {
            event.target.classList.add('virar')
            event.target.setAttribute('data-cartaVirada', `sim`)
            setTimeout(function () {
                event.target.style.backgroundImage = 'none'
                event.target.classList.add(event.target.getAttribute('data-id'))
            }, 300)
        }

        comparar(event)
    }

    function comparar(event) {
        if (event.target.getAttribute('data-cartaVirada') === 'sim') {
            boxes.forEach(box => {
                if (box.getAttribute('data-cartaVirada') === 'sim' && box.getAttribute('data-id') === event.target.getAttribute('data-id') && box !== event.target) {
                    setTimeout(function () {
                        box.style.opacity = 0
                        event.target.style.opacity = 0
                        box.setAttribute('data-cartaVirada', `nao`)
                        event.target.setAttribute('data-cartaVirada', `nao`)
                        numJogadas++
                        jogadas.textContent = `${numJogadas}`
                        fimDeJogo()
                    }, 1000)

                } else if (box.getAttribute('data-cartaVirada') === 'sim' && box.getAttribute('data-id') !== event.target.getAttribute('data-id') && box !== event.target && box.style.opacity !== '0') {
                    setTimeout(function () {
                        box.classList.remove('virar')
                        event.target.classList.remove('virar')
                        setTimeout(function () {
                            box.style.backgroundImage = 'url(./assets/cardGame.jpg)'
                            event.target.style.backgroundImage = 'url(./assets/cardGame.jpg)'
                        }, 300)
                        box.setAttribute('data-cartaVirada', `nao`)
                        event.target.setAttribute('data-cartaVirada', `nao`)
                        numJogadas++
                        jogadas.textContent = `${numJogadas}`
                        fimDeJogo()
                    }, 1500)
                }
            })
        }
    }

    function AnunciarOFim() {
        const jogarNovamente = document.createElement('button')
        const fim = document.createElement('p')
        fim.textContent = 'Fim de Jogo'
        jogarNovamente.textContent = 'Jogar novamente'
        divFinal.append(fim, jogarNovamente)
        divFinal.style.opacity = 1

        boxes.forEach(box => {
            box.removeEventListener('click', virar)
            if (!box.classList.contains('virar')) {
                box.style.opacity = 0.3
            }
        });

        function refreshPage() {
            window.location.reload();
        }

        const button = document.querySelector('button')
        button.addEventListener('click', refreshPage)
    }

    function fimDeJogo() {
        let numCartasRestantes = 0
        const numCartas = boxes.length

        boxes.forEach(box => {
            if (box.style.opacity !== '0') {
                numCartasRestantes++
            }
        })

        if (numCartasRestantes === 0) {
            AnunciarOFim()
        }

        if (numCartas === 20) {
            if (numJogadas === 20) {
                AnunciarOFim()
            }
        }

        if (numCartas === 30) {
            if (numJogadas === 30) {
                AnunciarOFim()
            }
        }
    }



    boxes.forEach(box => {
        box.addEventListener('click', virar)
    });
}

input.addEventListener('change', createGame)