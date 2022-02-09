const modal = document.querySelector('.modal')
const fotos = document.querySelectorAll('.fotos')
const img = document.querySelector('.img-apresentada')

function mostrarModal(event) {
    modal.style.display = 'flex'

    img.src = event.target.src
}

function esconderModal() {
    modal.style.display = 'none'
}



modal.addEventListener('click', esconderModal)
fotos.forEach(foto => {
    foto.addEventListener('click', mostrarModal)
});