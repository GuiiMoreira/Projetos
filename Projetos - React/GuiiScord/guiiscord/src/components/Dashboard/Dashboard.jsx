import React, { useState, useEffect } from 'react';
import { db } from '../../context/config';
import useGlobal from '../../hooks/useGlobal';
import { ref, onValue, getDatabase } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth } from '../../context/config';
import './Dashboard.css'
import iconChat from '../../assets/iconChat.png'


export default function Dashboard() {
    const { usuarioLogado, removeUsuarioLogado, setAbrirModalAddchannel, channels, handleSetChannels, setCurrentChannel } = useGlobal()
    const [user, setUser] = useState('')

    const dbRef = ref(getDatabase());
    const userId = usuarioLogado.user.uid

    function handleSetUser() {
        return onValue(ref(db, '/users/' + userId), (snapshot) => {
            setUser(snapshot.val() && snapshot.val());
            // ...
        }, {
            onlyOnce: true
        });
    }

    useEffect(() => {
        handleSetUser()
        handleSetChannels()
    }, [])


    return (
        <div className='dashboard'>
            <div className='title-dashboard'>
                <div >Bem vindo {user.nome}</div>
            </div>

            <button className='btn-dashboard'
                onClick={() => setAbrirModalAddchannel(true)
                }>
                Adicionar um novo canal
            </button>
            <div>
                <p className='title-channels'>Canais</p>
                {channels && Object.values(channels).map((channel) => {
                    return (
                        <div className='channels-dashboard' key={channel.id} onClick={() => setCurrentChannel(channel.id)}>
                            <img src={iconChat} alt="Chat" />
                            <p>{channel.name}</p>
                        </div>
                    )
                })}
            </div>


            <button onClick={() => {
                signOut(auth)
                removeUsuarioLogado()
            }}>
                Logout
            </button>
        </div>
    )
}
