const button = document.querySelector('button')
const card = document.querySelector('.card')


function teste() {
    card.classList.add('classtest')
}


button.addEventListener('click', teste)