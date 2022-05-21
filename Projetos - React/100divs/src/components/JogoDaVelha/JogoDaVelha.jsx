import React, { useState } from 'react'
import "./JogoDaVelha.css"

export default function JogoDaVelha() {
    const [playerUm, setPlayerUm] = useState(true)
    const [numeroDeJogadas, setNumeroDeJogadas] = useState(0)

    function handleMarcar(e) {
        if (e.innerHTML === 'x' || e.innerHTML === 'o') return

        playerUm ? e.innerHTML = 'x' : e.innerHTML = 'o'
        setPlayerUm(!playerUm)
        setNumeroDeJogadas(numeroDeJogadas + 1)
    }

    function handleReset() {
        const divs = document.querySelectorAll('.container-jogodavelha div div')
        divs.forEach(div => {
            div.innerHTML = ''
        })
    }

    return (
        <div className='container-jogodavelha'>
            <div className='flex bdb'>
                <div onClick={(e) => handleMarcar(e.target)}></div>
                <div className='bdm' onClick={(e) => handleMarcar(e.target)}></div>
                <div onClick={(e) => handleMarcar(e.target)}></div>

            </div>
            <div className='flex bdb'>
                <div onClick={(e) => handleMarcar(e.target)}></div>
                <div className='bdm' onClick={(e) => handleMarcar(e.target)}></div>
                <div onClick={(e) => handleMarcar(e.target)}></div>
            </div>
            <div className='flex'>
                <div onClick={(e) => handleMarcar(e.target)}></div>
                <div className='bdm' onClick={(e) => handleMarcar(e.target)}></div>
                <div onClick={(e) => handleMarcar(e.target)}></div>
            </div>
            <button onClick={() => { handleReset() }}>reset</button>
        </div>
    )
}
