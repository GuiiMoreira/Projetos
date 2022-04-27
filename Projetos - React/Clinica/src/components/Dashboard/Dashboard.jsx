import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
    return (
        <div className='flex'>
            <div className='container-dashboard'>
                <ul>
                    <li><Link to='/cadastrar-paciente'>Cadastrar Paciente</Link></li>
                    <li><Link to='/cadastrar-consulta'>Cadastrar Consulta</Link></li>
                    <li><Link to='/listar-pacientes'>Listar Pacientes</Link></li>
                    <li><Link to='/listar-consultas'>Listar Consultas</Link></li>
                    <li><Link to='/pesquisar-paciente'>Pesquisar Pacientes</Link></li>
                    <li><Link to='/pesquisar-consulta'>Pesquisar Consultas</Link></li>
                </ul>
                <div>
                    <button>Logout</button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
