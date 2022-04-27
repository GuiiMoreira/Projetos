import './SignIn.css';
import { client } from '../../config/client-graphql'
import { gql } from "@apollo/client";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  // function testando() {
  //   client.query({
  //     query: gql`
  //     query{
  //       Appointments{
  //         id
  //         creator
  //         pacientCPF
  //         doctorName
  //         date
  //       }
  //     }
  //   `
  //   }).then((res) => console.log(res))
  // }

  function login(userName, password) {
    client.mutate({
      mutation: gql`
      mutation{
        signIn(
          loginCredentialsDto: {  
           username: "${userName}"
          password: "${password}"
          }
        ){
          username
          token
        }
      }`
    }).then((res) => {
      console.log(res)
      localStorage.setItem('token', res.data.signIn.token);
      setToken(res.data.signIn.token)
      navigate('/home')
    }).catch((res) => {
      const errors = res.graphQLErrors.map((error) => {
        console.log(error);
      });
    });
  }

  return (
    <div className="App">
      <div className='left-side-signin'>
        <div className='mask'>
        </div>
      </div>
      <div className='right-side-signin'>
        <p className="title-signin"><span>Gui</span> Medicine</p>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} id='username' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
        </div>
        <div>
          <button onClick={() => login(userName, password)}>Login</button>
          <button>Cadastre-se</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
