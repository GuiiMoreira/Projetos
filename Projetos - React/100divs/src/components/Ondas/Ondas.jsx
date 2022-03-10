import React from 'react'
import './Ondas.css'

export default function Ondas() {
    function CriarOnda() {
        return (
            <>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </>
        )
    }

    return (
        <div className="ondas">
            <div className="onda"><CriarOnda /></div>
            <div className="onda"><CriarOnda /></div>
            <div className="onda"><CriarOnda /></div>
        </div>
    )
}