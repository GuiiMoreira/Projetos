import { signOut } from "firebase/auth";
import React, { useEffect } from 'react';
import iconChat from '../../assets/iconChat.png';
import iconEdit from '../../assets/iconEdit.png';
import iconDropdown from '../../assets/iconDropdown.png';
import { auth } from '../../context/config';
import useGlobal from '../../hooks/useGlobal';
import './Dashboard.css';
import { useState } from "react";


export default function Dashboard() {
    const [dropdownIcon, setDropdownIcon] = useState('')

    const { user,
        channels,
        handleSetUser,
        setConfigChannel,
        handleSetChannels,
        setCurrentChannel,
        removeUsuarioLogado,
        dashboard,
        setDashboard,
        setAbrirModalAddchannel } = useGlobal()


    useEffect(() => {
        handleSetUser()  // eslint-disable-next-line
        handleSetChannels()  // eslint-disable-next-line
    }, [])  // eslint-disable-next-line


    return (
        <div className={'dashboard ' + dashboard}>
            <div className='title-dashboard'>
                <div >Bem vindo {user.nome}</div>
            </div>
            <details open>
                <summary className="flex"
                    onClick={() => dropdownIcon === 'channels-close' ?
                        setDropdownIcon('channels-open') : setDropdownIcon('channels-close')}>
                    <p className='title-channels'>Canais</p>
                    <div className="flex">
                        <button className='btn-dashboard' onClick={() => setAbrirModalAddchannel('add')}>
                            +
                        </button>
                        <img src={iconDropdown} alt="" className={"dropdown-icon " + dropdownIcon}
                            onClick={() => dropdownIcon === 'channels-close' ?
                                setDropdownIcon('channels-open') : setDropdownIcon('channels-close')} />
                    </div>
                </summary>
                <div className='all-channels'>
                    {channels && Object.values(channels).map((channel) => {
                        return (
                            <div className='channels-dashboard' key={channel.id} >
                                <img src={iconChat} alt="Chat" />
                                <p onClick={() => {
                                    setCurrentChannel(channel)
                                    setDashboard('close-dashboard')
                                }
                                }>{channel.name}</p>
                                {channel.creator === user.id &&
                                    <div className="config-channel">
                                        <img src={iconEdit} alt="edit icon" className="edit-icon" onClick={() => {
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
            </details>
            <button className="btn-logout" onClick={() => {
                signOut(auth)
                removeUsuarioLogado()
            }}>
                Logout
            </button>
        </div>
    )
}
