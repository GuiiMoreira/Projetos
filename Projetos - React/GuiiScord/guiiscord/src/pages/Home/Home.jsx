import React from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';
import ModalAddChannel from '../../components/ModalAddChannel/ModalAddChannel';
import useGlobal from '../../hooks/useGlobal';
import './Home.css'

export default function Home() {
    const { abrirModalAddchannel } = useGlobal()

    return (
        <div className='home'>
            <Dashboard />
            {abrirModalAddchannel && <ModalAddChannel />}
        </div>
    )
}
