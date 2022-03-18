import React from 'react'
import Chat from '../../components/Chat/Chat';
import Dashboard from '../../components/Dashboard/Dashboard';
import ModalAddChannel from '../../components/ModalAddChannel/ModalAddChannel';
import ModalEditChannel from '../../components/ModalEditChannel/ModalEditChannel';
import useGlobal from '../../hooks/useGlobal';
import './Home.css'

export default function Home() {
    const { abrirModalAddchannel } = useGlobal()

    return (
        <div className='home'>
            <Dashboard />
            <Chat />
            {abrirModalAddchannel === 'add' && <ModalAddChannel />}
            {abrirModalAddchannel === 'edit' && <ModalEditChannel />}

        </div>
    )
}
