import React, { useEffect, useState } from 'react'
import './Chat.css'
import { set, ref, onValue, query, orderByChild } from "firebase/database";
import useGlobal from '../../hooks/useGlobal';
import { uid } from 'uid';
import { db } from '../../context/config';
import chatImage from '../../assets/chatImage.svg'
import imptyChat from '../../assets/imptyChat.svg'


export default function Chat() {
    const { setCurrentChannel, currentChannel, usuarioLogado, user } = useGlobal()
    const [messagesBox, setMessagesBox] = useState([])
    const [message, setMessage] = useState('')


    function handleSetMessagesBox() {
        return onValue(ref(db, `/message/${currentChannel}`, orderByChild('timeStamp')), (snapshot) => {
            setMessagesBox(snapshot.val() && Object.values(snapshot.val()));
            // ...
        }, {
            onlyOnce: true
        });
    }

    const topUserPostsRef = query(ref(db, `/message/${currentChannel}`, orderByChild('timeStamp')));
    console.log(Object.values(topUserPostsRef))

    useEffect(() => {
        handleSetMessagesBox()
    }, [currentChannel])

    useEffect(() => {
        setCurrentChannel('')
    }, [])

    function handleSendMessage() {
        const uuid = uid()
        const date = new Date()

        set(ref(db, `/message/${currentChannel}/${uuid}`), {
            id: uuid,
            message: message,
            creatorId: usuarioLogado.user.uid,
            creatorName: user.nome,
            timeStamp: date.getTime(),
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString('pt-BR')
        });
        setMessage('')
        handleSetMessagesBox()
    }

    return (
        <div className='chat'>
            <div className='message-box'>

                {currentChannel && messagesBox && messagesBox.map((message) => {
                    return (
                        <div key={message.id} className={message.creatorId === usuarioLogado.user.uid ? 'own message' : 'others message'}>
                            {message.creatorId !== usuarioLogado.user.uid &&
                                <p className='message-creator'>{message.creatorName}</p>
                            }
                            <p className='txt-message'>{message.message}</p>
                            <div className='message-date'>
                                <p>{message.date}</p>
                                <p>{message.time}</p>
                            </div>
                        </div>
                    )
                })}

                {!messagesBox && currentChannel && <div className='impty-chat'>
                    <img className='chat-image' src={imptyChat} alt="" />
                    <p>Inicie uma conversa nesse canal</p>
                </ div>}


                {!currentChannel && <div className='impty-chat'>
                    <img className='chat-image' src={chatImage} alt="" />
                    <p>Selecione um dos canais e participe da conversa!</p>
                </ div>}
            </div>
            {
                currentChannel && <div className='container-message'>
                    <button onClick={() => handleSendMessage()} disabled={!message && true}>Enviar</button>
                    <textarea name="message" id="" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
            }

        </div >
    )
}
