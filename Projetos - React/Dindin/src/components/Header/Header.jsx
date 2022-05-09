import React from 'react'
import logoDindin from '../../assets/logoDindin.svg';

export default function Header() {
    return (
        <div className="container-header">
            <img src={logoDindin} alt="logo Dindin" />
            <p>Dindin</p>
        </div>
    )
}
