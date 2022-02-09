const container = document.querySelector(".container")
const personagem = document.querySelector(".personagem")
const obstaculo1 = document.querySelector(".obstaculo1")
const obstaculo2 = document.querySelector(".obstaculo2")
const btnStart = document.querySelector(".start")

let contador = 0
let moverObstaculo

function pularPeronagem() {

    if (moverObstaculo === undefined) {
        return
    }

    personagem.style.bottom === '120px' ? personagem.style.bottom = '30px' : personagem.style.bottom = '120px'
}

function moverCenario() {
    moverObstaculo = setInterval(() => {
        contador += 3

        console.log(contador)

        if (contador % 50 === 0) {
            personagem.style.backgroundImage = 'url(./sprites/personagem2.png)'
        }

        if (contador % 50 === 5) {
            personagem.style.backgroundImage = 'url(./sprites/personagem1.png)'
        }

        let infoPersonagem = personagem.getBoundingClientRect()
        let infoObstaculo1 = obstaculo1.getBoundingClientRect()
        let infoObstaculo2 = obstaculo2.getBoundingClientRect()


        obstaculo1.style.right = `${contador}px`
        obstaculo2.style.right = `${contador - 400}px`

        if (infoObstaculo1.left <= (infoPersonagem.right - 10) && (infoObstaculo1.right - 10) >= infoPersonagem.left && infoObstaculo1.bottom === infoPersonagem.bottom) {

            personagem.style.backgroundImage = 'url(./sprites/personagem3.png)'
            clearInterval(moverObstaculo)
        }

        if (infoObstaculo2.left <= (infoPersonagem.right - 10) && (infoObstaculo2.right - 10) >= infoPersonagem.left && infoObstaculo2.bottom === infoPersonagem.bottom) {

            personagem.style.backgroundImage = 'url(./sprites/personagem3.png)'
            clearInterval(moverObstaculo)
        }
    }, 10)
}


container.addEventListener('click', pularPeronagem)
btnStart.addEventListener('click', moverCenario)



