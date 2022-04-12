import React from 'react'
import './Dashboard.css'

export default function Dashboard() {
    return (
        <div className='container-dashboard'>
            <ul>
                <li>Cadastrar Paciente</li>
                <li>Cadastrar Consulta</li>
                <li>Listar Pacientes</li>
                <li>Listar Consultas</li>
                <li>Pesquisar Pacientes</li>
                <li>Pesquisar Consultas</li>
            </ul>
            <div>
                <button>Logout</button>
            </div>
        </div>
    )
}
