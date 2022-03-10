import { useState } from 'react';
import { useLocalStorage } from 'react-use';

function useGlobalProvider() {
    const [usuarioLogado, setUsuarioLogado, removeUsuarioLogado] = useLocalStorage('token', '');
    const [nomeEmail, setNomeEmail] = useState(
        'nomeEmail',
        { nome: '', email: '' }
    );
    const [erroLogin, setErroLogin] = useState();


    return {
        // token,
        // setToken,
        removeUsuarioLogado,
        nomeEmail,
        setNomeEmail,
        usuarioLogado,
        setUsuarioLogado,
        erroLogin,
        setErroLogin,
    };
}

export default useGlobalProvider;
