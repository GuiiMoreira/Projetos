import { signOut } from "firebase/auth";
import React, { useEffect } from 'react';
import iconChat from '../../assets/iconChat.png';
import iconEdit from '../../assets/iconEdit.png';
import { auth } from '../../context/config';
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
                <div className='all-channels'>
                    {channels && Object.values(channels).map((channel) => {
                        return (
                            <div className='channels-dashboard' key={channel.id} >
                                <img src={iconChat} alt="Chat" />
                                <p onClick={() => setCurrentChannel(channel)}>{channel.name}</p>
                                {channel.creator === user.id &&
                                    <div className="config-channel">
                                        <img src={iconEdit} className="edit-icon" onClick={() => {
                                            setAbrirModalAddchannel('edit')
                                            setConfigChannel(channel)
                                        }} />
                                        <button className="delete-icon" onClick={() => {
                                            setAbrirModalAddchannel('delete')
                                            setConfigChannel(channel)
                                        }}>x</button>
                                    </div>}

                            </div>
                        )
                    })}
                </div>
            </div>
            <button className="btn-logout" onClick={() => {
                signOut(auth)
                removeUsuarioLogado()
            }}>
                Logout
            </button>
        </div>
    )
}
