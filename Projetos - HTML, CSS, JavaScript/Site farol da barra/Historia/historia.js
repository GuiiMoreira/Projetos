const setaDireita = document.querySelector('.seta-direita')
const setaEsquerda = document.querySelector('.seta-esquerda')
const imgHistoria = document.querySelector('.img-historia')
let pageHero = 0

function passarFoto() {
    pageHero++
    const page = pageHero % 3
    if (page === 0) {
        imgHistoria.src = "../imagens/galeria/farol-da-barra-antigo-1.jpg"
    }

    if (page === 1) {
        imgHistoria.src = "../imagens/galeria/farol-da-barra-antigo-2.jpg"

    }

    if (page === 2) {
        imgHistoria.src = "../imagens/galeria/farol-da-barra-antigo-3.jpg"
    }
}

function voltarFoto() {
    pageHero--
    let page = pageHero % 3


    if (page < 0) {
        page = 2
        pageHero = 2
    }

    console.log(page)

    if (page === 0) {
        imgHistoria.src = "../imagens/galeria/farol-da-barra-antigo-1.jpg"
    }

    if (page === 1) {
        imgHistoria.src = "../imagens/galeria/farol-da-barra-antigo-2.jpg"

    }

    if (page === 2) {
        imgHistoria.src = "../imagens/galeria/farol-da-barra-antigo-3.jpg"
    }
}

setaDireita.addEventListener('click', passarFoto)
setaEsquerda.addEventListener('click', voltarFoto)
