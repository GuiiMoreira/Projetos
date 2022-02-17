import { useState } from 'react';
import './editaUsuario.css';
import mostraSenha from '../../assets/header/mostraSenha.svg';
import naoMostraSenha from '../../assets/header/naoMostraSenha.svg';
import sucessoImg from '../../assets/header/sucesso.svg';
import btnFechar from '../../assets/header/close.svg'
import useRequests from '../../hooks/useRequests';


export default function EditaUsuario({ setEditaUsuario, setAbrirOpcoesPerfil, usuario, handleObeterUsuario }) {
    const requisicao = useRequests();
    const [emailCpfRepetidos, setEmailCpfRepetidos] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(usuario);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [mostraSenhaInput, setMostraSenhaInput] = useState(false);
    const [camposPreenchidos, setCamposPreenchidos] = useState({
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
    });
    const [senhasIguais, setSenhasIguais] = useState(true);
    const resetaCampos = () => {
        setCamposPreenchidos({
            nome: true,
            email: true,
            cpf: true,
            telefone: true,
        });
    }

    async function handleEditarUsuario() {
        setEmailCpfRepetidos(false);
        setSenhasIguais(true);
        resetaCampos();

        if (novaSenha !== confirmaSenha) {
            return setSenhasIguais(false);
        }

        if (!usuarioLogado.nome) {
            return setCamposPreenchidos({ ...camposPreenchidos, nome: false });
        } else {
            setCamposPreenchidos({ ...camposPreenchidos, nome: true });
        }
        if (!usuarioLogado.email) {
            return setCamposPreenchidos({ ...camposPreenchidos, email: false });
        } else {
            setCamposPreenchidos({ ...camposPreenchidos, email: true });
        }
        if (!usuarioLogado.cpf) {
            return setCamposPreenchidos({ ...camposPreenchidos, cpf: false });
        } else {
            setCamposPreenchidos({ ...camposPreenchidos, cpf: true });
        }
        if (!usuarioLogado.telefone) {
            return setCamposPreenchidos({ ...camposPreenchidos, telefone: false });
        } else {
            setCamposPreenchidos({ ...camposPreenchidos, telefone: true });
        };
        const senhaEnviada = novaSenha.trim();

        const body = {
            nome: usuarioLogado.nome,
            email: usuarioLogado.email,
            senha: senhaEnviada,
            cpf: usuarioLogado.cpf,
            telefone: usuarioLogado.telefone
        }

        const resposta = await requisicao.putOne('perfil', body)

        if (resposta) {
            setSucesso(true);
            setTimeout(() => {
                setEditaUsuario(false)
            }, 2000);
        } else if (resposta.status === 401) {
            setEmailCpfRepetidos(true)
            return
        }

        setAbrirOpcoesPerfil(false)
        handleObeterUsuario()
    }

    return (
        <div className="modal-edita-usuario">
            {!sucesso ? (
                <div className="card-edita-usuario">
                    <div className="topo-edita-usuario">
                        <span className='titulo-modal-editar'>Edite seu cadastro</span>
                        <img
                            className='btnFechar'
                            src={btnFechar} alt="botão de fechar"
                            onClick={() => setEditaUsuario(false)} />
                    </div>
                    <div className="formulario-edita-usuario">
                        <label htmlFor="nome">
                            <span>Nome*</span>
                            <input type="text" id='nome' placeholder='Digite seu nome'
                                value={usuarioLogado.nome}
                                onChange={(e) => setUsuarioLogado({ ...usuarioLogado, nome: e.target.value })}
                                onBlur={(e) => !e.target.value ? setCamposPreenchidos({ ...camposPreenchidos, nome: false }) : setCamposPreenchidos({ ...camposPreenchidos, nome: true })}
                            />
                            {!camposPreenchidos.nome && (
                                <span className='campo-faltando-edicao'>O campo nome é obrigatório</span>
                            )}
                        </label>
                        <label htmlFor="email">
                            <span>E-mail*</span>
                            <input type="email" name="email" id="email" placeholder='Digite seu e-mail'
                                value={usuarioLogado.email}
                                onChange={(e) => setUsuarioLogado({ ...usuarioLogado, email: e.target.value })}
                                onBlur={(e) => !e.target.value ? setCamposPreenchidos({ ...camposPreenchidos, email: false }) : setCamposPreenchidos({ ...camposPreenchidos, email: true })} />
                            {!camposPreenchidos.email && (
                                <span className='campo-faltando-edicao'>O campo e-mail é obrigatório</span>
                            )}
                            {emailCpfRepetidos && (
                                <span className='campo-faltando-edicao'>Já existe um usuário com este email ou cpf</span>
                            )}
                        </label>
                        <div className="cpf-telefone">
                            <label htmlFor="cpf">
                                CPF*
                                <input type="number" name='cpf' placeholder='Digite seu CPF'
                                    value={usuarioLogado.cpf}
                                    onChange={(e) => { setUsuarioLogado({ ...usuarioLogado, cpf: e.target.value }); }}
                                    onBlur={(e) => !e.target.value ? setCamposPreenchidos({ ...camposPreenchidos, cpf: false }) : setCamposPreenchidos({ ...camposPreenchidos, cpf: true })} />
                                {!camposPreenchidos.cpf && (
                                    <span className='campo-faltando-edicao'>O campo cpf é obrigatório</span>
                                )}
                                {emailCpfRepetidos && (
                                    <span className='campo-faltando-edicao'>Já existe um usuário com este email ou cpf</span>
                                )}
                            </label>
                            <label htmlFor="telefone">
                                Telefone*
                                <input type="number" name='telefone'
                                    placeholder='Digite seu telefone'
                                    value={usuarioLogado.telefone}
                                    onChange={(e) => setUsuarioLogado({ ...usuarioLogado, telefone: e.target.value })}
                                    onBlur={(e) => !e.target.value ? setCamposPreenchidos({ ...camposPreenchidos, telefone: false }) : setCamposPreenchidos({ ...camposPreenchidos, telefone: true })} />
                                {!camposPreenchidos.telefone && (
                                    <span className='campo-faltando-edicao'>O campo telefone é obrigatório</span>
                                )}
                            </label>
                        </div>
                        <label htmlFor="nova-senha"
                            className='posicao-relativa'>
                            <span>Nova Senha</span>
                            <input
                                type={!mostraSenhaInput ? ("password") : ("text")} name="nova-senha" id="nova-senha" placeholder='Digite uma nova senha'
                                onChange={(e) => setNovaSenha(e.target.value)} />
                            {mostraSenhaInput ? (<img className='icone-senha-edita' src={mostraSenha} alt=""
                                onClick={() => setMostraSenhaInput(false)} />
                            ) :
                                (<img className='icone-senha-edita' src={naoMostraSenha} alt=""
                                    onClick={() => setMostraSenhaInput(true)} />)}
                            {!senhasIguais && (
                                <span className="absoluto-edita campo-faltando-edicao">
                                    As senhas precisam ser idênticas!
                                </span>
                            )}
                        </label>
                        <label htmlFor="confirma-senha" className='posicao-relativa'>
                            <span>Confirmar Senha</span>
                            <input type={!mostraSenhaInput ? ("password") : ("text")} name="confirma-senha" id="confirma-senha" placeholder='Confirme sua nova senha'
                                onChange={(e) => setConfirmaSenha(e.target.value)} />
                            {mostraSenhaInput ? (<img className='icone-senha-edita' src={mostraSenha} alt=""
                                onClick={() => setMostraSenhaInput(false)} />
                            ) :
                                (<img className='icone-senha-edita' src={naoMostraSenha} alt=""
                                    onClick={() => setMostraSenhaInput(true)} />)}
                            {!senhasIguais && (
                                <span className="absoluto-edita campo-faltando-edicao">
                                    As senhas precisam ser idênticas!
                                </span>
                            )}
                        </label>
                    </div>
                    <div className="final-edita-usuario">
                        <button disabled={!camposPreenchidos.nome || !camposPreenchidos.email || !camposPreenchidos.cpf || !camposPreenchidos.telefone ? true : false} className='botao-aplicar' onClick={handleEditarUsuario}>Aplicar</button>
                    </div>
                </div>
            ) :
                (<div className="card-sucesso">
                    <img src={sucessoImg} alt="" />
                    <div>
                        Cadastro Alterado com sucesso!
                    </div>
                </div>)}
        </div>
    )
}