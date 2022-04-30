import { gql } from "@apollo/client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../config/client-graphql';
import { addToken } from '../../redux/authSlice';
import './SignIn.css';

function SignIn() {
  const [cpf, setcpf] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();

  function login(cpf, password) {

    client.mutate({
      mutation: gql`
      mutation{
        signIn(
          loginCredentialsDto: {  
           cpf: "${cpf}"
           password: "${password}"
          }
        ){
          cpf
          name
          token
        }
      }`
    }).then((res) => {
      console.log(res)
      localStorage.setItem('token', res.data.signIn.token);
      dispatch(addToken(res.data.signIn))
      navigate('/')
    }).catch((res) => {
      const errors = res.graphQLErrors.map((error) => {
        console.log(error);
      });
    });
  }

  return (
    <div className="App">
      <div className='container-signin'>
        <p className="title-signin"><Link to='/'>Clinica <span>Online</span></Link></p>
        <div>
          <label htmlFor="cpf">CPF</label>
          <input type="text" value={cpf} onChange={(e) => setcpf(e.target.value)} id='cpf' />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
        </div>
        <div>
          <button onClick={() => login(cpf, password)}>Login</button>

          <p>É sua primeira vez aqui? <Link to='/sign-up' className="link">Cadastre-se</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
