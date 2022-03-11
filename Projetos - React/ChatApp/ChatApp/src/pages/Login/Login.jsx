import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import iconEsconderSenha from '../../assets/esconderSenha.svg';
import iconMostrarSenha from '../../assets/mostraSenha.svg';
import { auth } from '../../context/config';
import useGlobal from '../../hooks/useGlobal';
import './Login.css';


function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const { setUsuarioLogado, usuarioLogado } = useGlobal()
    const history = useHistory()


    async function HandleLogin(event) {
        event.preventDefault()

        if (!email || !senha) {
            setErrors('Preencha todos os campos')
            return;
        } else {
            setErrors('')
        }

        const resposta = await signInWithEmailAndPassword(auth, email, senha)

        if (resposta) {
            setUsuarioLogado(resposta);
            history.push('/Home');
        }
    }

    function verificaUsuario(usuario) {
        usuario && history.push('/Home');
    }

    useEffect(() => {
        verificaUsuario(usuarioLogado)
        // eslint-disable-next-line
    }, []);

    return (
        <body className="body-login">
            <div className="Lado-esquerdo-layout-login">
                <p>Mantenha-se conectado com o mundo.</p>
            </div>
            <div className="Lado-direito-layout-login">
                <p className="titulo-login">Faça seu login!</p>
                <form onSubmit={HandleLogin}>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="text" name="email" id="email" placeholder='Digite seu email'
                            onChange={(e) => setEmail(e.target.value)} value={email}
                        />
                    </div>
                    <div>
                        <div className='container-esqueceu-senha'>
                            <label htmlFor="senha">Senha</label>
                            <a href='/Login' className='links-login'>Esqueceu a senha?</a>
                        </div>
                        <div className='container-input-senha-login'>
                            <input type={mostrarSenha ? 'text' : 'password'} name="senha" id="senha" placeholder='Digite sua senha'
                                onChange={(e) => setSenha(e.target.value)} value={senha}
                            />
                            <img className='icon-senha-login'
                                src={mostrarSenha ? iconEsconderSenha : iconMostrarSenha} alt=""
                                onClick={() => mostrarSenha ? setMostrarSenha(false) : setMostrarSenha(true)}
                            />
                        </div>
                        {errors && <span className='erro-login'>{errors}</span>}

                    </div>

                    <button className='form-button'>Entrar</button>
                    <p className='txt-link'>Ainda não possui uma conta? <Link to='/Cadastro' className='links-login'> Cadastre-se</Link></p>
                </form>
            </div>
        </body>
    );
}

export default Login;
