import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoDindin from '../../assets/logoDindin.svg';
import "./Header.css"

export default function Header() {
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])


    async function loadUser() {
        try {
            const response = await fetch("http://localhost:3333/user", {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUyMjc1NjUxLCJleHAiOjE2NTIzMDQ0NTF9.j03poB5TAQNhq6paygEG6Crxilwh7TOG67NzmO8S2qk",
                },
            })

            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-header">
            <div>
                <img src={logoDindin} alt="logo Dindin" />
                <p>Dindin</p>
            </div>
            <div>
                <p className='user'>Olá, {user && user.name}</p>
                <button onClick={() => {
                    localStorage.setItem('token', '');
                    navigate("/login")
                }}>Logout</button>
            </div>
        </div>
    )
}
