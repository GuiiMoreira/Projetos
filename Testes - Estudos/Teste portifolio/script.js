const button = document.querySelector('button')
const hamburguerEsquerdo = document.querySelector('.lado-esquerdo-cinco')
const hamburguerDireito = document.querySelector('.lado-direito-cinco')
const teemoEsquerdo = document.querySelector('.lado-esquerdo-quatro')
const teemoDireito = document.querySelector('.lado-direito-quatro')
const caveiraEsquerdo = document.querySelector('.lado-esquerdo-tres')
const caveiraDireito = document.querySelector('.lado-direito-tres')
const miranhaEsquerdo = document.querySelector('.lado-esquerdo-dois')
const miranhaDireito = document.querySelector('.lado-direito-dois')
const faceEsquerdo = document.querySelector('.lado-esquerdo-um')
const faceDireito = document.querySelector('.lado-direito-um')
const imagemInteira = document.querySelector('.container-zero')
const largura = window.screen.width
const apresentacao = document.querySelector('.container-apresentacao')

function alertar() {
    if (button.textContent === "Hide the universe's secret!") {
        fecharAMente()
    }
    else {
        abrirAMente()
    }
}


function fecharAMente() {
    hamburguerEsquerdo.style.left = `calc(50vw - 174px)`
    hamburguerDireito.style.right = `calc(50vw - 174px)`

    setTimeout(() => {
        teemoEsquerdo.style.left = `calc(50vw - 174px)`
        teemoDireito.style.right = `calc(50vw - 174px)`
    }, 1000)

    setTimeout(() => {
        hamburguerEsquerdo.style.display = `none`
        hamburguerDireito.style.display = `none`
    }, 1990)

    setTimeout(() => {
        caveiraEsquerdo.style.left = `calc(50vw - 168.5px)`
        caveiraDireito.style.right = `calc(50vw - 168.5px)`
    }, 2000)

    setTimeout(() => {
        teemoEsquerdo.style.display = 'none'
        teemoDireito.style.display = 'none'
    }, 2990)

    setTimeout(() => {
        miranhaEsquerdo.style.left = `calc(50vw - 185px)`
        miranhaDireito.style.right = `calc(50vw - 185px)`
    }, 3000)

    setTimeout(() => {
        caveiraEsquerdo.style.display = 'none'
        caveiraDireito.style.display = 'none'
    }, 3990)

    setTimeout(() => {
        faceEsquerdo.style.left = `calc(50vw - 175px)`
        faceDireito.style.right = `calc(50vw - 175px)`
        apresentacao.style.left = '10vw'
    }, 4000)

    setTimeout(() => {
        miranhaEsquerdo.style.display = 'none'
        miranhaDireito.style.display = 'none'
    }, 4990)

    setTimeout(() => {
        button.textContent = 'Open my mind!'

        faceDireito.style.transition = '0s'
        faceEsquerdo.style.transition = '0s'
    }, 6000)
}

function abrirAMente() {
    faceDireito.style.transition = '1s'
    faceEsquerdo.style.transition = '1s'
    faceEsquerdo.style.left = '90px'
    faceDireito.style.right = '90px'
    apresentacao.style.left = '-300px'


    setTimeout(() => {
        miranhaEsquerdo.style.display = 'initial'
        miranhaDireito.style.display = 'initial'
    }, 100)

    setTimeout(() => {
        miranhaEsquerdo.style.left = '190px'
        miranhaDireito.style.right = '190px'

    }, 1000)

    setTimeout(() => {
        caveiraEsquerdo.style.display = 'initial'
        caveiraDireito.style.display = 'initial'
    }, 1010)

    setTimeout(() => {
        caveiraEsquerdo.style.left = '320px'
        caveiraDireito.style.right = '320px'
    }, 2000)

    setTimeout(() => {
        teemoEsquerdo.style.display = 'initial'
        teemoDireito.style.display = 'initial'
    }, 2010)

    setTimeout(() => {
        teemoEsquerdo.style.left = '440px'
        teemoDireito.style.right = '440px'
    }, 3000)

    setTimeout(() => {
        hamburguerEsquerdo.style.display = 'initial'
        hamburguerDireito.style.display = 'initial'
    }, 3010)

    setTimeout(() => {
        hamburguerEsquerdo.style.left = '540px'
        hamburguerDireito.style.right = '540px'
    }, 4000)

    setTimeout(() => {
        button.textContent = "Hide the universe's secret!"
    }, 3000)
}


// if (largura > 1400) {
//     fecharAMente()
// }


// document.addEventListener("DOMContentLoaded", fecharAMente);
button.addEventListener('click', alertar)