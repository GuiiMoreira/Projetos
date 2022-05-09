import './Calculadora.css'
import { useState } from 'react'

export default function Calculadora() {
    const [operador, setOperador] = useState('')
    const [resultMemory, setResultMemory] = useState('')
    const [result, setResult] = useState('')

    function handleOperador(e) {
        if (operador) {
            handleResult()
        }
        setOperador(e.target.innerHTML)
    }

    function handleResult() {
        if (operador === '+') {
            setResult((Number(resultMemory) + Number(result)).toString().slice(0, 13))
            setResultMemory('')
        }

        if (operador === '-') {
            setResult((Number(resultMemory) - Number(result)).toString().slice(0, 13))
            setResultMemory('')
        }

        if (operador === 'x') {
            setResult((Number(resultMemory) * Number(result)).toString().slice(0, 13))
            setResultMemory('')
        }

        if (operador === '÷') {
            setResult((Number(resultMemory) / Number(result)).toString().slice(0, 13))
            setResultMemory('')
        }
    }

    function handleNumber(e) {
        if (operador && !resultMemory) {
            setResultMemory(result)
            setResult(e.target.innerHTML)
        } else {
            if (result.length < 13)
                setResult(result + e.target.innerHTML)
        }
    }

    return (
        <div className="div-calculadora">
            <div className='container-calculadora'>
                <div className='display'>{result}</div>
                <div className='container-digitos'>

                    <div className='digito-numeros'>
                        <p className='digito-cinza' onClick={(() => setResult(''))}>C</p>
                        <p className='digito-cinza' onClick={(() => {
                            setOperador('')
                            setResult('')
                            setResultMemory('')
                        })}>CE</p>
                        <p className='digito-cinza' onClick={(() => setResult(`${Number(result) * (-1)}`))}>+/-</p>
                        <p className='digito-cinza'>%</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>1</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>2</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>3</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>4</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>5</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>6</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>7</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>8</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>9</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>0</p>
                        <p className='digito-preto' onClick={((e) => handleNumber(e))}>.</p>
                        <p className='digito-laranja' onClick={(e) => {
                            handleResult()
                            setOperador('')
                        }}>=</p>
                    </div>


                    <div className='digito-operadores'>
                        <p className='digito-laranja' onClick={(e) => handleOperador(e)}>+</p>
                        <p className='digito-laranja' onClick={(e) => handleOperador(e)}>-</p>
                        <p className='digito-laranja' onClick={(e) => handleOperador(e)}>x</p>
                        <p className='digito-laranja' onClick={(e) => handleOperador(e)}>÷</p>
                    </div>

                </div>
            </div>
        </div>
    )
}