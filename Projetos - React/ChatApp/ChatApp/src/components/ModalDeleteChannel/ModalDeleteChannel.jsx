import React, { useState } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { db } from '../../context/config';
import { ref, remove } from "firebase/database";

export default function ModalDeleteChannel() {
    const { setAbrirModalAddchannel, usuarioLogado, handleSetChannels, configChannel } = useGlobal()

    function handleDeleteChannel() {
        remove(ref(db, `channel/${configChannel.id}`));
        remove(ref(db, `message/${configChannel.id}`));

        handleSetChannels()
        setAbrirModalAddchannel(false)
    };

    return (
        <div className='backdrop' >
            <div className='modalAddChannel'>
                <label htmlFor="nameChannel">Deseja excluir este canal?</label>
                <p className='msg-delete'>Todas as mensagens serão apagadas!</p>
                <div>
                    <button className='btn-confirm' onClick={() => handleDeleteChannel()}>Confirmar</button>
                    <button className='btn-cancel' onClick={() => setAbrirModalAddchannel(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
