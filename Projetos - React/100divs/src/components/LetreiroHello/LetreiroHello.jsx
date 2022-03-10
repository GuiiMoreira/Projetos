import React, { useState } from 'react'
import './LetreiroHello.css'

export default function LetreiroHello() {
    function Quadrado({ set }) {
        const [background, setBackground] = useState(set)

        return (
            <div className='quadrado-linha' style={{ background: background ? 'white' : '' }}
                onClick={() => setBackground(!background)}>
            </div>
        )
    }

    function Linha({ set }) {
        return (
            <div className='linha-letreiro'>
                <Quadrado set={set.some((e) => e === 1)} />
                <Quadrado set={set.some((e) => e === 2)} />
                <Quadrado set={set.some((e) => e === 3)} />
                <Quadrado set={set.some((e) => e === 4)} />
                <Quadrado set={set.some((e) => e === 5)} />
                <Quadrado set={set.some((e) => e === 6)} />
                <Quadrado set={set.some((e) => e === 7)} />
                <Quadrado set={set.some((e) => e === 8)} />
                <Quadrado set={set.some((e) => e === 9)} />
                <Quadrado set={set.some((e) => e === 10)} />
                <Quadrado set={set.some((e) => e === 11)} />
                <Quadrado set={set.some((e) => e === 12)} />
                <Quadrado set={set.some((e) => e === 13)} />
                <Quadrado set={set.some((e) => e === 14)} />
                <Quadrado set={set.some((e) => e === 15)} />
                <Quadrado set={set.some((e) => e === 16)} />
                <Quadrado set={set.some((e) => e === 17)} />
                <Quadrado set={set.some((e) => e === 18)} />
                <Quadrado set={set.some((e) => e === 19)} />
                <Quadrado set={set.some((e) => e === 20)} />
            </ div>
        )
    }

    return (
        <div className='letreiro-hello'>
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[1, 3, 5, 6, 7, 9, 13, 18, 19]} />
            <Linha set={[1, 3, 5, 9, 13, 17, 20]} />
            <Linha set={[1, 2, 3, 5, 6, 9, 13, 17, 20]} />
            <Linha set={[1, 3, 5, 9, 13, 17, 20]} />
            <Linha set={[1, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 18, 19]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
            <Linha set={[]} />
        </div>
    )
}
