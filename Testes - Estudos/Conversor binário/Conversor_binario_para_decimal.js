// Esse código converte qualquer número binário para número decimal

function conversorBinarioParaDecimal(numBinario){
    
    let n = numBinario.toString()
    let numDecimal = 0
    let potencia = 0
    
    for (let i = 0; i < n.length; i++){
        if(n[i]!="0"){
            potencia = n.length -1 - i
            numDecimal += Math.pow(2,potencia)
        }
    }
    
    console.log(numDecimal)
}