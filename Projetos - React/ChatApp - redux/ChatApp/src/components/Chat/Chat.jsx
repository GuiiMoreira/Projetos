import React, { useEffect, useState } from 'react'
import './Chat.css'
import { set, ref, onValue, update } from "firebase/database";
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
        return onValue(ref(db, `/message/${currentChannel.id}`), (snapshot) => {
            setMessagesBox(snapshot.val() && Object.values(snapshot.val()));
            // ...
        }, {
            onlyOnce: true
        });
    }

    messagesBox && messagesBox.sort((a, b) => a.timeStamp - b.timeStamp)

    function scrollBottom() {
        const objDiv = document.querySelector(".chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    useEffect(() => {
        handleSetMessagesBox()
        setTimeout(() => scrollBottom(), 150)
    }, [currentChannel])

    useEffect(() => {
        setCurrentChannel('')
    }, [])

    function handleSendMessage() {
        const uuid = uid()
        const date = new Date()

        set(ref(db, `/message/${currentChannel.id}/${uuid}`), {
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
        scrollBottom()
    }

    return (
        <div className='chat'>
            {currentChannel && <div className='header-chat'>{currentChannel.name}</div>}

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
