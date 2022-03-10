import './DivTres.css'
import { useState } from 'react'

export default function DivTres() {
    const [active, setActive] = useState(false)

    return (
        <div className="div-tres" onClick={() => setActive(!active)} id={active && 'div-tres-active'}>
            <div className="circulo-um">
                <div className="circulo-dois">
                    <div className="circulo-tres">
                    </div>
                </div>
            </div>
        </div>
    )
}