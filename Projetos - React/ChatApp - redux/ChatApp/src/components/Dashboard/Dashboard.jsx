import { signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { set, ref, onValue, remove, update } from "firebase/database";
import iconChat from '../../assets/iconChat.png';
import iconEdit from '../../assets/iconEdit.png';
import { auth, db } from '../../context/config';
import useGlobal from '../../hooks/useGlobal';
import './Dashboard.css';


export default function Dashboard() {
    const { user,
        channels,
        handleSetUser,
        setConfigChannel,
        handleSetChannels,
        setCurrentChannel,
        removeUsuarioLogado,
        setAbrirModalAddchannel } = useGlobal()


    useEffect(() => {
        handleSetUser()
        handleSetChannels()
    }, [])


    function handleDeleteChannel(channel) {
        remove(ref(db, `channel/${channel.id}`));
        remove(ref(db, `message/${channel.id}`));

        handleSetChannels()
    };


    return (
        <div className='dashboard'>
            <div className='title-dashboard'>
                <div >Bem vindo {user.nome}</div>
            </div>

            <button className='btn-dashboard'
                onClick={() => setAbrirModalAddchannel('add')
                }>
                Adicionar um novo canal
            </button>
            <div>
                <p className='title-channels'>Canais</p>
                {channels && Object.values(channels).map((channel) => {
                    return (
                        <div onMouseOver={(e) => console.log(e.target)} className='channels-dashboard' key={channel.id} >
                            <img src={iconChat} alt="Chat" />
                            <p onClick={() => setCurrentChannel(channel)}>{channel.name}</p>
                            {channel.creator === user.id &&
                                <div className="config-channel">
                                    <img src={iconEdit} className="edit-icon" onClick={() => {
                                        setAbrirModalAddchannel('edit')
                                        setConfigChannel(channel)
                                    }} />
                                    <button className="delete-icon" onClick={() => handleDeleteChannel(channel)}>x</button>
                                </div>}

                        </div>
                    )
                })}
            </div>

            <button className="btn-edit-user" onClick={() => {
                console.log(user)
            }}>
                Editar Perfil
            </button>
            <button className="btn-logout" onClick={() => {
                signOut(auth)
                removeUsuarioLogado()
            }}>
                Logout
            </button>
        </div>
    )
}
