import React from 'react'
import Chat from '../../components/Chat/Chat';
import Dashboard from '../../components/Dashboard/Dashboard';
import ModalAddChannel from '../../components/ModalAddChannel/ModalAddChannel';
import ModalDeleteChannel from '../../components/ModalDeleteChannel/ModalDeleteChannel';
import ModalEditChannel from '../../components/ModalEditChannel/ModalEditChannel';
import useGlobal from '../../hooks/useGlobal';
import iconDashboard from '../../assets/iconDashboard.png';
import './Home.css'

export default function Home() {
    const { abrirModalAddchannel, setDashboard, dashboard } = useGlobal()

    return (
        <div className='home'>
            <img src={iconDashboard} alt='dashboard icon' className='dashboard-icon'
                onClick={() => dashboard === 'open-dashboard' ?
                    setDashboard('close-dashboard') : setDashboard('open-dashboard')} />
            <Dashboard />
            <Chat />
            {abrirModalAddchannel === 'add' && <ModalAddChannel />}
            {abrirModalAddchannel === 'edit' && <ModalEditChannel />}
            {abrirModalAddchannel === 'delete' && <ModalDeleteChannel />}
        </div>
    )
}
