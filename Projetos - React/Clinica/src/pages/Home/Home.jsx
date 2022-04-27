import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import iconTime from '../../assets/time-icon.png'
import iconCalendar from '../../assets/calendar-icon.png'
import iconCelphone from '../../assets/celphone-icon.png'



export default function Home() {
    return (
        <div className='container-home'>
            <div className="background-home">
                <header className="header-home">
                    <div className="logo">Clinica</div>
                    <nav>
                        <p>Agendar Exames</p>
                        <p>Agendar Vacinas</p>
                        <p>Resultados Exames</p>
                        <p>Fale Conosco</p>
                        <p ><button><Link to='/sign-in'>Entrar</Link></button></p>
                    </nav>
                </header>
                <div className='txt-background'>
                    <p>Faça o agendamento online e seja atendido mais rápido no laboratório!</p>
                    <br />
                    <span>Você pode retirar os resultados dos seus exames no nosso site também.</span>
                    <button>Agende seus exames e vacinas</button>
                </div>
            </div>

            <div className="conteudo-home">
                <p className='title'>Conheça os benefícios do agendamento online</p>

                <div>
                    <p>Atendimento rápido</p>
                    <img className='icon' src={iconTime} alt="" />
                    <p className='azul-claro'>Agendando seus exames e vacinas online, você chega na unidade e recebe atendimento prioritário.</p>
                </div>

                <div>
                    <p>Liberdade de escolha</p>
                    <img className='icon' src={iconCalendar} alt="" />
                    <p className='azul-claro'>Escolha o melhor local, data e horário entre diversas opções.</p>
                </div>



                <div>
                    <p>Agendamento totalmente online</p>
                    <img className='icon-dif' src={iconCelphone} alt="" />
                    <p className='azul-claro'>Agende seus exames e vacinas de maneira rápida e fácil.</p>
                </div>
            </div>
        </div>
    )
}
