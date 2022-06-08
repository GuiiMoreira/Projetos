import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoDindin.svg';
import request from '../../services/api/request';
import './SignUp.css';

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const [error, setError] = useState({ message: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name || !email || !password || !checkPassword) {
                return;
            }
            if (password !== checkPassword) {
                alert('Senhas diferentes');
            }

            const response = await request.post('/signup', {
                name,
                email,
                password
            })
            if (response.status > 204) {
                return;
            }
            navigate('/login');
        } catch (error) {
            setError({ message: `${error.response.data.mensagem}` })
        }
    }
    return (
        <div className="container">
            <header className='container-logo' >
                <img src={logo} alt='logo' />
                <span>Dindin</span>
            </header>
            <main className='form-align'>
                <section className='form-container' >
                    <form onSubmit={handleSubmit} className='form-card' >
                        <h1>Cadastre-se</h1>
                        <label>Nome</label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>E-mail</label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Senha</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Confirmação de senha</label>
                        <input
                            id='checkPassword'
                            name='checkPassword'
                            type='password'
                            value={checkPassword}
                            required
                            onChange={(e) => setCheckPassword(e.target.value)}
                        />
                        {<p className='error-message'>{error.message}</p>}
                        <button>Cadastrar</button>
                    </form>
                    <span onClick={() => { navigate('/login') }} >Já tem cadastro? Clique aqui!</span>
                </section>
            </main>
        </div>
    )
}