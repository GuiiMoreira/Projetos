import { signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import iconChat from '../../assets/iconChat.png';
import { auth, db } from '../../context/config';
import useGlobal from '../../hooks/useGlobal';
import './Dashboard.css';


export default function Dashboard() {
    const { user,
        channels,
        handleSetUser,
        handleSetChannels,
        setCurrentChannel,
        removeUsuarioLogado,
        setAbrirModalAddchannel } = useGlobal()


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
