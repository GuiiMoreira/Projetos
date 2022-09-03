import { onValue, ref } from "firebase/database";
import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { db } from '../context/config';


function useGlobalProvider() {
    const [usuarioLogado, setUsuarioLogado, removeUsuarioLogado] = useLocalStorage('token', '');
    const [nomeEmail, setNomeEmail] = useState(
        'nomeEmail',
        { nome: '', email: '' }
    );
    const [erroLogin, setErroLogin] = useState();
    const [abrirModalAddchannel, setAbrirModalAddchannel] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [channels, setChannels] = useState('');
    const [currentChannel, setCurrentChannel] = useState('');
    const [configChannel, setConfigChannel] = useState('');
    const [user, setUser] = useState('');

    function handleSetChannels() {
        return onValue(ref(db, '/channel'), (snapshot) => {
            setChannels(snapshot.val() && snapshot.val());
            // ...
        }, {
            onlyOnce: true
        });
    }

    function handleSetUser() {
        console.log(usuarioLogado)
        return onValue(ref(db, '/users/' + usuarioLogado.user.uid), (snapshot) => {
            setUser(snapshot.val() && snapshot.val());
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
        currentChannel,
        setCurrentChannel,
        handleSetUser,
        user,
        setUser,
        configChannel,
        setConfigChannel,
        dashboard,
        setDashboard
    };
}

export default useGlobalProvider;
