const fotos = document.querySelectorAll('.foto-topico')
const fotosAtras = document.querySelectorAll('.foto-topico-atras')


function mudarImage(event) {
    event.target.previousElementSibling.style.display = 'block'
    event.target.style.display = 'none'
}

function voltarImage(event) {
    event.target.nextElementSibling.style.display = 'block'
    event.target.style.display = 'none'
}



fotos.forEach((foto) => foto.addEventListener('mouseover', mudarImage))
fotosAtras.forEach((foto) => foto.addEventListener('mouseout', voltarImage))
