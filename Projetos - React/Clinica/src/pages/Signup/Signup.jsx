import { gql } from "@apollo/client";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../config/client-graphql';
import './Signup.css';

export default function Signup() {
    const [cadastro, setCadastro] = useState({
        name: "",
        password: "",
        cpf: "",
        lastname: "",
        email: "",
        cep: "",
        address: "",
        celnumber: "",
        birthdate: "",
        gender: "",
        healthInsurance: "",
        numberHealthInsurance: ""
    })

    const navigate = useNavigate()

    function signup(cpf, password) {

        client.mutate({
            mutation: gql`
            mutation{
                signUp(
                  authCredentialsDto: {  
                        name: "${cadastro.name}"
                        password: "${cadastro.password}"
                        cpf: "${cadastro.cpf}"
                        lastname: "${cadastro.lastname}"
                        email: "${cadastro.email}"
                        cep: "${cadastro.cep}"
                        address: "${cadastro.address}"
                        celnumber: "${cadastro.celnumber}"
                        birthdate: "${cadastro.birthdate}"
                        gender: "${cadastro.gender}"
                        healthInsurance: "${cadastro.healthInsurance}"
                        numberHealthInsurance: "${cadastro.numberHealthInsurance}"
                  }
                ){
                  name
                }
              }`
        }).then((res) => {
            console.log(res)
            navigate('/sign-in')
        }).catch((res) => {
            const errors = res.graphQLErrors.map((error) => {
                console.log(error);
            });
        });
    }

    return (
        <div className="App">
            <div className='container-signup'>
                <p className="title-signup"><Link to='/'>Clinica <span>Online</span></Link></p>
                <div className="flex">
                    <div>
                        <label htmlFor="name">Nome*</label>
                        <input type="text" value={cadastro.name} onChange={(e) => setCadastro({ ...cadastro, name: e.target.value })} id='name' />
                    </div>
                    <div>
                        <label htmlFor="lastname">Sobrenome*</label>
                        <input type="text" value={cadastro.lastname} onChange={(e) => setCadastro({ ...cadastro, lastname: e.target.value })} id='lastname' />
                    </div>

                    <div >
                        <label htmlFor="cpf">CPF*</label>
                        <input type="text" value={cadastro.cpf} onChange={(e) => setCadastro({ ...cadastro, cpf: e.target.value })} id='cpf' />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Data de nascimento*</label>
                        <input type="date" value={cadastro.birthdate} onChange={(e) => setCadastro({ ...cadastro, birthdate: e.target.value })} id='birthdate' />
                    </div>
                    <div>
                        <label htmlFor="celnumber">Telefone*</label>
                        <input type="celnumber" value={cadastro.celnumber} onChange={(e) => setCadastro({ ...cadastro, celnumber: e.target.value })} id='celnumber' />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail*</label>
                        <input type="email" value={cadastro.email} onChange={(e) => setCadastro({ ...cadastro, email: e.target.value })} id='email' />
                    </div>

                    <div>
                        <label htmlFor="gender">Gênero</label>
                        <input type="text" value={cadastro.gender} onChange={(e) => setCadastro({ ...cadastro, gender: e.target.value })} id='gender' />
                    </div>
                    <div>
                        <label htmlFor="password">Senha*</label>
                        <input type="password" value={cadastro.password} onChange={(e) => setCadastro({ ...cadastro, password: e.target.value })} id='password' />
                    </div>
                    <div>
                        <label htmlFor="cep">CEP*</label>
                        <input type="text" value={cadastro.cep} onChange={(e) => setCadastro({ ...cadastro, cep: e.target.value })} id='cep' />
                    </div>
                    <div>
                        <label htmlFor="address">Endereço*</label>
                        <input type="text" value={cadastro.address} onChange={(e) => setCadastro({ ...cadastro, address: e.target.value })} id='address' />
                    </div>
                    <div>
                        <label htmlFor="healthInsurance">Convênio</label>
                        <input type="text" value={cadastro.healthInsurance} onChange={(e) => setCadastro({ ...cadastro, healthInsurance: e.target.value })} id='healthInsurance' />
                    </div>
                    <div>
                        <label htmlFor="numberHealthInsurance">Número do plano de saúde</label>
                        <input type="text" value={cadastro.numberHealthInsurance} onChange={(e) => setCadastro({ ...cadastro, numberHealthInsurance: e.target.value })} id='numberHealthInsurance' />
                    </div>
                </div>

                <div>

                    <button onClick={() => signup(cadastro.cpf, cadastro.password)}>Cadastrar</button>


                    <p>Já possui cadastro? <Link to='/sign-in' className="link">Fazer login</Link> </p>
                </div>
            </div>
        </div>
    );
}
