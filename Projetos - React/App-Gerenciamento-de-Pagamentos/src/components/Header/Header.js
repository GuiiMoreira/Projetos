import './Header.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobal from '../../hooks/useGlobal';
import iconSetaBaixoVerde from '../../assets/icon-seta-baixo-verde.svg';
import iconEditar from '../../assets/icon-editar.svg';
import iconSair from '../../assets/icon-sair.svg';
import EditaUsuario from '../EditaUsuario/EditaUsuario';
import useRequests from '../../hooks/useRequests';

function Header({ titulo, classname, subclasse }) {
    const requisicao = useRequests()
    const history = useHistory()
    const { setToken, usuarioLogado, setUsuarioLogado } = useGlobal()
    const [abrirOpcoesPerfil, setAbrirOpcoesPerfil] = useState(false);
    const [editaUsuario, setEditaUsuario] = useState(false);

    async function handleObeterUsuario() {
        const resposta = await requisicao.get('perfil')

        setUsuarioLogado(resposta)
    }

    useEffect(() => {
        handleObeterUsuario()
    }, [])

    return (
        <div className='header'>
            <div className={'header-titulo ' + classname}>
                <p><span className={subclasse && 'nav-titulo'} onClick={() => subclasse && history.push("/Clientes")}>{titulo}</span>{subclasse && <span className={subclasse}><span>{'>'}</span>Detalhes do cliente</span>}</p>

            </div>

            <div className='user-header'>

                <div className='user-image'>{usuarioLogado && usuarioLogado.nome[0]}</div>
                <p className='user-nome'>{usuarioLogado && usuarioLogado.nome}</p>

                <img src={iconSetaBaixoVerde} className='icon-seta-header' alt='' onClick={() =>
                    abrirOpcoesPerfil ? setAbrirOpcoesPerfil(false) : setAbrirOpcoesPerfil(true)} />
            </div>

            <div className={abrirOpcoesPerfil ? 'modal-opcoes-perfil' : 'modal-none'} >

                <div onClick={() => setEditaUsuario(true)}>
                    <img src={iconEditar} alt='' className='icon-modal-opcoes'
                    />
                    <p>Editar</p>
                </div>
                <div onClick={() => setToken('')}>
                    <img src={iconSair} alt='' />
                    <p>Sair</p>
                </div>
            </div>

            {editaUsuario &&
                <EditaUsuario
                    setEditaUsuario={setEditaUsuario}
                    setAbrirOpcoesPerfil={setAbrirOpcoesPerfil}
                    usuario={usuarioLogado}
                    handleObeterUsuario={handleObeterUsuario}
                    setUsuarioLogado={setUsuarioLogado}
                />}

        </div>
    );
}

export default Header;