import './SeguirCursor.css'
import { useState } from 'react'

export default function SeguirCursor() {
    const [position, setPosition] = useState({})

    return (
        <div className="seguir-cursor"
            onMouseMove={(e) => {
                setPosition({ x: e.pageX, y: e.pageY })
            }}
            onMouseLeave={() => setPosition({})}
        >
            <div className='cursor-bola' style={{ left: position.x, top: position.y }}></div>
            <div className="pulso" style={{ left: (position.x), top: position.y }}></div>
            <div className="pulso2" style={{ left: (position.x), top: position.y }}></div>
        </div>
    )
}