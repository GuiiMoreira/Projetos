const iconMenu = document.querySelector('.icon-menu')
const navHome = document.querySelector('.nav-header')


function abrirMenu() {
    navHome.style.display === 'flex' ? navHome.style.display = 'none' : navHome.style.display = 'flex';
    navHome.style.flexDirection = 'column';
}

iconMenu.addEventListener('click', abrirMenu)