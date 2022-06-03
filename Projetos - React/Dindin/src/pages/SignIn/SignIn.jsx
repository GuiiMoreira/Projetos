import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoDindin.svg';
import request from '../../services/api/request';
import './SignIn.css';

export default function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ message: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/home');
        }

    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError({ message: 'Todos os campos são obrigatórios.' })
        }
        try {
            const response = await request.post('/login', {
                email,
                password
            })

            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/home');

        } catch (err) {
            setError({ message: err.response.data.mensagem })
            setTimeout(() => setError(false), 3000)
        }
    }

    return (
        <div className="container">
            <header className='container-logo' >
                <img src={logo} alt='logo' />
            </header>
            <main className='signIn-container'>
                <section className='signIn-info' >
                    <h1>Controle suas <span>finanças</span>, sem planilha chata.</h1>
                    <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                    <button onClick={() => navigate('/signup')}>Cadastre-se</button>
                </section>
                <section className='signIn-form'>
                    <h1>Faça seu Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>E-mail</label>
                            <input
                                id='email'
                                type='email'
                                name='email'
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Senha</label>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className='error-message'>{error.message}</p>}
                        <button >Entrar</button>
                    </form>
                </section>
            </main>
        </div >
    )
}