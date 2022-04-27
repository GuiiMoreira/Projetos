import { gql } from '@apollo/client';
import React, { useState } from 'react';
import { client } from '../../config/client-graphql';
import './CadastroPaciente.css';

export default function CadastroPaciente() {

    function cadastrarPaciente(nome, sobrenome, cpf, dataNascimento) {

        client.mutate({
            mutation: gql`
          mutation{
            createPacient(
              createPacientInput: {  
              name: "${nome}"
              lastname: "${sobrenome}"
              cpf: "${cpf}"
              birthdate: "${dataNascimento}"
              appointments: []
              }
            ){
              name,
              birthdate
            }
          }`
        }).then((res) => {
            console.log(res)
        }).catch((res) => {
            const errors = res.graphQLErrors.map((error) => {
                console.log(error);
            });
        });
    }

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')


    return (
        <div className='container-cadastro-paciente'>
            <div>
                <h1>Cadastrar Paciente</h1>

                <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" id="sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="CPF">CPF</label>
                    <input type="number" id="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="data-de-nascimento">Data de nascimento</label>
                    <input type="date" id="data-de-nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </div>

                <button onClick={() => cadastrarPaciente(nome, sobrenome, cpf, dataNascimento)}>Cadastrar</button>
            </div>
        </div>
    )
}
