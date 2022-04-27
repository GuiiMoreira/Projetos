import { gql } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { client } from '../../config/client-graphql';

export default function ListarPacientes() {
  const [pacients, setPacients] = useState([])

  useEffect(() => {
    listarPacientes()
  }, [])

  function listarPacientes() {
    client.query({
      query: gql`
      query{
        pacients{
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
      setPacients(res.data.pacients)
    }).catch((res) => {
      const errors = res.graphQLErrors.map((error) => {
        console.log(error);
      });
    });
  }

  return (
    <div>{pacients.map((pacient) => {
      return (
        <div className='flex' key={pacient.id}>
          <p>{pacient.name}</p>
          <p>{pacient.lastname}</p>
          <p>{pacient.cpf}</p>
          <p>{pacient.birthdate}</p>
        </div>
      )
    })}</div>
  )
}
