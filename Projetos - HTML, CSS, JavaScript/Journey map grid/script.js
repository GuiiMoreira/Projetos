const addLinha = document.querySelector('.add-linha')
const addColuna = document.querySelector('.add-coluna')
const table = document.querySelector('.table')

const linhaTitulo = document.querySelector('.linha-titulo')
let qtdColunas = 8
let qtdLinhas = 13

function criarLinha() {
    const divLinha = document.createElement('div')
    const divLinhaTitulo = document.createElement('textarea')

    divLinha.classList.add('linha-normal')
    divLinhaTitulo.classList.add('item-titulo')

    divLinha.append(divLinhaTitulo)
    table.append(divLinha)

    for (let i = 0; i < qtdColunas; i++) {
        const input = document.createElement('textarea')
        input.classList.add('item-input')

        divLinha.append(input)
    }

    qtdLinhas++
}


function criarColuna() {
    const linha = document.querySelectorAll('.linha-normal')
    const itemTitulo = document.createElement('textarea')
    itemTitulo.classList.add('item-titulo')

    linhaTitulo.append(itemTitulo)
    console.log(qtdLinhas)
    console.log(linha)
    for (let i = 0; i < qtdLinhas; i++) {
        const input = document.createElement('textarea')
        input.classList.add('item-input')


        linha[i].append(input)
    }

    qtdColunas++
}


addLinha.addEventListener('click', criarLinha)
addColuna.addEventListener('click', criarColuna)





