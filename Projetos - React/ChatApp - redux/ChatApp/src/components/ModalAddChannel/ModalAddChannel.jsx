import React, { useState } from 'react'
import './ModalAddChannel.css'
import useGlobal from '../../hooks/useGlobal'
import { uid } from 'uid';
import { db } from '../../context/config';
import { set, ref } from "firebase/database";

export default function ModalAddChannel() {
    const { setAbrirModalAddchannel, usuarioLogado, handleSetChannels } = useGlobal()
    const [channelName, setChannelName] = useState('')

    function handleAddChannel() {
        const uuid = uid()
        set(ref(db, `/channel/${uuid}`), {
            id: uuid,
            name: channelName,
            creator: usuarioLogado.user.uid
        });

        setAbrirModalAddchannel(false)
        handleSetChannels()
    }

    return (
        <div className='backdrop' >
            <div className='modalAddChannel'>
                <label htmlFor="nameChannel">Digite o nome do novo canal</label>
                <input type="text" name="nameChannel" valuer={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder='Digite o nome do canal...' />
                <div>
                    <button className='btn-confirm' onClick={() => handleAddChannel()}>Confirmar</button>
                    <button className='btn-cancel' onClick={() => setAbrirModalAddchannel(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
