const listaNumeros = []
const numerosPrimos = []

for (let i = 0; i <= 1000; i++) {
    listaNumeros.push(i)
}

for (let i = 0; i <= 1000; i++) {
    let quantidadeDivisores = 0

    for (let j = 0; j <= i; j++) {

        i % j === 0 && quantidadeDivisores++

    }

    quantidadeDivisores === 2 && numerosPrimos.push(i)

}

const somaTotal = numerosPrimos.reduce((acc, numero) => acc + numero)

return somaTotal