import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './login.css';
import useGlobal from '../../hooks/useGlobal'
import iconMostrarSenha from '../../assets/header/mostraSenha.svg';
import iconEsconderSenha from '../../assets/header/naoMostraSenha.svg';
import useRequests from '../../hooks/useRequests'

function Login() {
    const { setToken, erroLogin, setErroLogin } = useGlobal()
    const history = useHistory()
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const requisicao = useRequests();

    async function HandleLogin(event) {
        event.preventDefault()

        if (!email || !senha) {
            setErrors('Preencha todos os campos')
            setErroLogin(false)
            return;
        } else {
            setErrors('')
        }

        const body = {
            email,
            senha
        };

        const resposta = await requisicao.post('login', body);

        if (resposta) {
            setErroLogin(false)
            setToken(resposta.token);
            history.push('/Home');
        }
    }

    return (
        <body className="body-login">
            <div className="Lado-esquerdo-layout-login">
                <p>Gerencia todos os pagamentos da sua empresa em um só lugar.</p>
            </div>
            <div className="Lado-direito-layout-login">
                <p className="titulo-login">Faça seu login!</p>
                <form onSubmit={HandleLogin()}>
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
                        {erroLogin && <span className='erro-login'>Senha ou Email incorretos</span>}
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
