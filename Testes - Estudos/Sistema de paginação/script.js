const caixas = document.querySelectorAll('.box')
const btnPrev = document.querySelector('.prev')
const btnNext = document.querySelector('.next')

const numItens = 4
let page = 0

function numerarcaixas() {
    for (let i = 0; i < caixas.length; i++) {

        const pageItem = Math.trunc(i / numItens)
        caixas[i].setAttribute('data-page', `${pageItem}`)


        if (caixas[i].dataset.page !== '0') {
            caixas[i].style.display = 'none'
        }
    }
}

numerarcaixas()

function sistemaDePaginacao() {
    let pagAtual = 0;
    const totalDePag = Math.ceil(caixas.length / numItens)

    pagAtual = page % totalDePag

    while (pagAtual < 0) {
        pagAtual = pagAtual + totalDePag
    }

    caixas.forEach(caixa => {
        pagAtual.toString() !== caixa.dataset.page ? caixa.style.display = 'none' : caixa.style.display = 'inline'
    });


}

function avançarPag() {
    page++
    sistemaDePaginacao()
}

function voltarPag() {
    page--
    sistemaDePaginacao()
}




btnPrev.addEventListener('click', voltarPag)
btnNext.addEventListener('click', avançarPag)


