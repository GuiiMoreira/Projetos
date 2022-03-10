import './BotaoMenuFechar.css'
import { useState } from 'react'

export default function BotaoMenuFechar() {
    const [menuAtivo, setMenuAtivo] = useState(false)

    return (
        <div className="div-dois">
            <div className="menu" onClick={() => setMenuAtivo(!menuAtivo)}>
                <div className={menuAtivo ? 'linha umX' : 'linha um'}></div>
                <div className={menuAtivo ? 'linha doisX' : 'linha dois'}></div>
                <div className={menuAtivo ? 'linha tresX' : 'linha tres'}></div>
            </div>
        </div>
    )
}