import { gql } from '@apollo/client';
import React, { useState } from 'react'
import { client } from '../../config/client-graphql';

export default function PesquisarPaciente() {
    const [cpfPesquisado, setCpfPesquisado] = useState('')
    const [pacient, setPacient] = useState({})


    function pesquisarPaciente() {
        client.query({
            query: gql`
          query{
            pacient(cpf: "${cpfPesquisado}"){
              id
              creator
              name
              lastname
              cpf
              birthdate
              appointments{
                id
                creator
              }
            }
          }
        `
        }).then((res) => {
            setPacient(res.data.pacient)
            console.log(res)
        }).catch((res) => {
            const errors = res.graphQLErrors.map((error) => {
                setPacient({})
                console.log(error);
            });
        });
    }
    return (
        <div>
            <div>
                <input type="text" placeholder='insira o cpf do paciente' value={cpfPesquisado} onChange={(e) => setCpfPesquisado(e.target.value)} />
                <button onClick={() => pesquisarPaciente()}>Pesquisar</button>
            </div>
            {pacient &&
                <div>
                    <p>{pacient.name}</p>
                    <p>{pacient.lastname}</p>
                    <p>{pacient.cpf}</p>
                    <p>{pacient.birthdate}</p>
                </div>}
        </div>
    )
}
