// Esse código converte qualquer número decimal para número binário

function conversorDecimalParaBinario(numDecimal)
{
    let resto = 0
    let convertido = ""
    
    while (numDecimal > 1)
    {
        resto = numDecimal % 2
        convertido += resto
        numDecimal = Math.floor(numDecimal/2)
    }

    if (numDecimal = 2){convertido+= 1}
    
    let numBinario = ""
    
    for (let i = convertido.length-1; i>=0; i--) 
    {
        numBinario += convertido[i]
    }
    
    console.log(numBinario)
}