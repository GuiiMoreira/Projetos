import React, { useState } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { db } from '../../context/config';
import { ref, update } from "firebase/database";

export default function ModalEditChannel() {
    const { setAbrirModalAddchannel, usuarioLogado, handleSetChannels, configChannel } = useGlobal()
    const [channelName, setChannelName] = useState('')

    function handleEditChannel() {

        update(ref(db, `/channel/${configChannel.id}`), {
            id: configChannel.id,
            name: channelName,
            creator: usuarioLogado.user.uid
        });

        setAbrirModalAddchannel(false)
        handleSetChannels()
    }

    return (
        <div className='backdrop' >
            <div className='modalAddChannel'>
                <label htmlFor="nameChannel">Digite um novo nome para o canal</label>
                <input type="text" name="nameChannel" valuer={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder='Digite o nome do canal...' />
                <div>
                    <button className='btn-confirm' onClick={() => handleEditChannel()}>Confirmar</button>
                    <button className='btn-cancel' onClick={() => setAbrirModalAddchannel(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
