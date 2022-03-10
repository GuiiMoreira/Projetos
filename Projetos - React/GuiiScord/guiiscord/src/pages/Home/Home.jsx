import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../../context/config'
import useGlobal from '../../hooks/useGlobal'

export default function Home() {
    const { removeUsuarioLogado } = useGlobal()

    return (
        <div>
            Home
            <button onClick={() => {
                signOut(auth)
                removeUsuarioLogado()
            }}>Deslogar</button>
        </div>
    )
}
