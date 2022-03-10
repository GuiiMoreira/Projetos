import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { ref, onValue } from "firebase/database";
import { db } from '../context/config'


function useGlobalProvider() {
    const [usuarioLogado, setUsuarioLogado, removeUsuarioLogado] = useLocalStorage('token', '');
    const [nomeEmail, setNomeEmail] = useState(
        'nomeEmail',
        { nome: '', email: '' }
    );
    const [erroLogin, setErroLogin] = useState();
    const [abrirModalAddchannel, setAbrirModalAddchannel] = useState(false)
    const [channels, setChannels] = useState('')
    const [currrentChannel, setCurrentChannel] = ('')

    function handleSetChannels() {
        return onValue(ref(db, '/channel'), (snapshot) => {
            setChannels(snapshot.val() && snapshot.val());
            // ...
        }, {
            onlyOnce: true
        });
    }



    return {
        removeUsuarioLogado,
        nomeEmail,
        setNomeEmail,
        usuarioLogado,
        setUsuarioLogado,
        erroLogin,
        setErroLogin,
        abrirModalAddchannel,
        setAbrirModalAddchannel,
        channels,
        setChannels,
        handleSetChannels,
        currrentChannel,
        setCurrentChannel
    };
}

export default useGlobalProvider;
