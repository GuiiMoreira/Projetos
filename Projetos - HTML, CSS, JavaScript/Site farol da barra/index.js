const hero = document.querySelector('.hero')
const poesias = document.querySelector('.poesias')
const poesia = document.querySelector('.poesia')
const autor = document.querySelector('.autor')
const setaDireita = document.querySelectorAll('.seta-direita')
const setaEsquerda = document.querySelectorAll('.seta-esquerda')
const titulo = document.querySelector('.titulo')
const iconMenu = document.querySelector('.icon-menu')
const navHome = document.querySelector('.nav-home')
const txtHero2 = document.querySelector('.txt-hero-2')
const txtHero3 = document.querySelector('.txt-hero-3')
const txtHero4 = document.querySelector('.txt-hero-4')
const txtHero5 = document.querySelector('.txt-hero-5')
const txtHero6 = document.querySelector('.txt-hero-6')
const aviso = document.querySelector('.aviso')
let pageHero = 0
let pagePoesia = 0

const arrayPoesias = [
    {
        texto: '"Ah, que bom você chegou, bem vindo a Salvador, coração do Brasil! Vem, você vai conhecer, a cidade de luz e prazer, correndo atrás do trio!"',
        autor: 'Nizan Guanaes'
    },
    {
        texto: '"Eu só quero um fim de tarde no farol da barra, junto a você, ouvindo o barulhinho do mar, sentindo teu cheiro, tocando seus cabelos, eu quero noite de lua cheia, quero a vida inteira pra amar você!"',
        autor: 'John Oliveira'
    },
    {
        texto: '"Quando o sol se põe, vem o farol iluminar as águas da Bahia. No Farol da Barra, o encontro é pouco, a conversa é curta, tudo é tão rápido como se furta, como a luz bate nas águas, como tudo que se passa"',
        autor: 'Novos Baianos - Farol da Barra (Caetano Veloso)'
    },
]

function mudarBackgroundHora() {
    const data = new Date()

    const dia = data.getDate()
    const dia_sem = data.getDay()
    const mes = data.getMonth()
    const ano2 = data.getYear()
    const ano4 = data.getFullYear()
    const hora = data.getHours()
    const min = data.getMinutes()
    const seg = data.getSeconds()
    const mseg = data.getMilliseconds()
    const tz = data.getTimezoneOffset()
    if (hora >= 6 && hora < 12) {
        hero.style.backgroundImage = 'url("imagens/galeria/farol-da-barra-1.jpeg")'
    }

    if (hora >= 12 && hora < 18) {
        hero.style.backgroundImage = 'url("imagens/galeria/por-do-sol.jpeg")'
    }

    if (hora >= 18 && hora < 24) {
        hero.style.backgroundImage = 'url("imagens/galeria/farol-da-barra-3.jpeg")'
    }

    if (hora >= 0 && hora < 6) {
        hero.style.backgroundImage = 'url("imagens/galeria/farol-da-barra-amanhecer.jpg")'
    }
}

mudarBackgroundHora()


function contagemParaOCarnaval() {
    const data = new Date()
    const carnaval = new Date('2022-02-25')
    const diff = Math.abs(carnaval.getTime() - data.getTime())
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    console.log('Faltam ' + days + ' dias para o carnaval!')
    aviso.textContent = `Faltam apenas  ${days}  dias para o melhor carnaval do mundo!`
}
contagemParaOCarnaval()

function abrirMenu() {
    navHome.style.display === 'flex' ? navHome.style.display = 'none' : navHome.style.display = 'flex';
    navHome.style.flexDirection = 'column';
}

function mostrarSetaHero() {
    setaDireita[0].style.opacity = 1
    setaEsquerda[0].style.opacity = 1
}

function mostrarSetaPoesias() {
    setaDireita[1].style.opacity = 1
    setaEsquerda[1].style.opacity = 1
}

function esconderSeta(event) {
    setaDireita[0].style.opacity = 0
    setaEsquerda[0].style.opacity = 0
    setaDireita[1].style.opacity = 0
    setaEsquerda[1].style.opacity = 0
}

function passarFotoHero(event) {
    pageHero++
    const page = pageHero % 4
    if (page === 0) {
        txtHero6.style.width = '0'
        setTimeout(() => { txtHero6.style.display = 'none' })
        mudarBackgroundHora()
        titulo.style.opacity = 1
    }

    if (page === 1) {
        event.target.parentNode.style.backgroundImage = `url('imagens/galeria/farol-da-barra-2.jpeg')`
        titulo.style.opacity = 0
        txtHero2.style.left = '15vw'
        setTimeout(() => {
            txtHero3.style.left = '20vw'
        }, 1000)
    }

    if (page === 2) {
        event.target.parentNode.style.backgroundImage = `url('imagens/galeria/farol-da-barra-3.jpeg')`
        txtHero2.style.left = '-500px'
        setTimeout(() => {
            txtHero3.style.left = '-500px'
        }, 200)

        setTimeout(() => {
            txtHero4.style.transform = 'scale(1)'
        }, 500)

        setTimeout(() => {
            txtHero5.style.transform = 'scale(1)'
        }, 1500)
    }

    if (page === 3) {
        event.target.parentNode.style.backgroundImage = `url('imagens/galeria/farol-da-barra-4.jpeg')`
        txtHero4.style.transform = 'scale(0)'
        txtHero5.style.transform = 'scale(0)'

        setTimeout(() => {
            txtHero6.style.width = '30vw'
            txtHero6.style.display = 'inline'
        }, 500)
    }
}

function voltarFotoHero(event) {
    pageHero--
    let page = pageHero % 4

    if (page < 0) {
        page = 3
    }

    if (page === 0) {
        txtHero2.style.left = '-50vw'
        setTimeout(() => {
            txtHero3.style.left = '-50vw'
        }, 200)
        mudarBackgroundHora()
        titulo.style.opacity = 1
    }

    if (page === 1) {
        event.target.parentNode.style.backgroundImage = `url('imagens/galeria/farol-da-barra-2.jpeg')`
        txtHero4.style.transform = 'scale(0)'
        txtHero5.style.transform = 'scale(0)'
        txtHero2.style.left = '15vw'
        setTimeout(() => {
            txtHero3.style.left = '20vw'
        }, 1000)
    }

    if (page === 2) {
        event.target.parentNode.style.backgroundImage = `url('imagens/galeria/farol-da-barra-3.jpeg')`
        txtHero6.style.width = '0'
        setTimeout(() => { txtHero6.style.display = 'none' })
        setTimeout(() => {
            txtHero4.style.transform = 'scale(1)'
        }, 500)

        setTimeout(() => {
            txtHero5.style.transform = 'scale(1)'
        }, 1500)
    }

    if (page === 3) {
        event.target.parentNode.style.backgroundImage = `url('imagens/galeria/farol-da-barra-4.jpeg')`
        titulo.style.opacity = 0
        setTimeout(() => {
            txtHero6.style.width = '30vw'
            txtHero6.style.display = 'inline'
        }, 500)
    }
}

function passarPoesia() {
    pagePoesia++
    pagePoesia >= arrayPoesias.length ? pagePoesia = 0 : ''

    poesia.textContent = arrayPoesias[pagePoesia].texto
    autor.textContent = arrayPoesias[pagePoesia].autor
}

function voltarPoesia() {
    pagePoesia--
    pagePoesia < 0 ? pagePoesia = arrayPoesias.length - 1 : ''

    poesia.textContent = arrayPoesias[pagePoesia].texto
    autor.textContent = arrayPoesias[pagePoesia].autor
}

hero.addEventListener('mouseover', mostrarSetaHero)
hero.addEventListener('mouseout', esconderSeta)
poesias.addEventListener('mouseover', mostrarSetaPoesias)
poesias.addEventListener('mouseout', esconderSeta)
setaDireita[0].addEventListener('click', passarFotoHero)
setaDireita[1].addEventListener('click', passarPoesia)
setaEsquerda[0].addEventListener('click', voltarFotoHero)
setaEsquerda[1].addEventListener('click', voltarPoesia)
iconMenu.addEventListener('click', abrirMenu)

