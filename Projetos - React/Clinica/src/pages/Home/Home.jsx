import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import iconCalendar from '../../assets/home/calendar-icon.png'
import iconCelphone from '../../assets/home/celphone-icon.png'
import iconTime from '../../assets/home/time-icon.png'
import iconPefil from '../../assets/home/perfil-icon.png'
import Footer from '../../components/Footer/Footer'
import { removeToken, selectAuth } from '../../redux/authSlice'
import './Home.css'


export default function Home() {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    return (
        <div className='container-home'>
            <div className="background-home">
                <header className="header-home">
                    <div className="logo">Clinica <span>Online</span></div>
                    <nav>
                        <p>Agendar Exames</p>
                        <p>Agendar Vacinas</p>
                        <p>Resultados Exames</p>
                        <p>Fale Conosco</p>
                        <p >
                            {!auth.token ?
                                <button><Link to='/sign-in'>Entrar</Link></button> :
                                <div className='flex' onClick={() => dispatch(removeToken())}>
                                    <img className='icon' src={iconPefil} alt="" />
                                    <span>Olá {auth.name}</span>
                                </div>}
                        </p>
                    </nav>
                </header>
                <div className='txt-background'>
                    <p>Faça o agendamento online e seja atendido mais rápido no laboratório!</p>
                    <br />
                    <span>Retire o resultado dos seus examos sem sair de casa.</span>
                    <button>Agende seus exames e vacinas</button>
                </div>
            </div>

            <div className="conteudo-home">
                <p className='title'>Conheça os benefícios do agendamento online</p>
                <div className='flex'>
                    <div className='terco'>
                        <p>Atendimento rápido</p>
                        <img className='icon' src={iconTime} alt="" />
                        <p className='azul-claro'>Agendando seus exames e vacinas online, você chega na unidade e recebe atendimento prioritário.</p>
                    </div>

                    <div className='terco'>
                        <p>Liberdade de escolha</p>
                        <img className='icon' src={iconCalendar} alt="" />
                        <p className='azul-claro'>Escolha o melhor local, data e horário entre diversas opções.</p>
                    </div>

                    <div className='terco'>
                        <p>Agendamento totalmente online</p>
                        <img className='icon-dif' src={iconCelphone} alt="" />
                        <p className='azul-claro'>Agende seus exames e vacinas de maneira rápida e fácil.</p>
                    </div>
                </div>
            </div>

            <div className="conteudo-home blog">
                <p className='title'>Blog e Notícias</p>
                <div className='flex'>
                    <div className='terco'>
                        <img src="https://bkt-sa-east-1-cms-drupal.s3.sa-east-1.amazonaws.com/laboratorioexame.com.br/2021-03/Vacina%20da%20gripe%20vs%20vacina%20covid%20Exame.jpg?IcjJUpzEjSBq80tdQk7JDhc_vjjrQgho" alt="" />
                        <p className='azul-claro'>Estamos realizando a nova campanha de vacinação contra gripe.</p>
                    </div>

                    <div className='terco'>
                        <img src="https://vidasaudavel.einstein.br/wp-content/uploads/2020/01/coracao_gravidez-1024x683.jpg" alt="" />
                        <p className='azul-claro'>Existe idade certa para gravidez ?.</p>
                    </div>

                    <div className='terco'>
                        <img src="http://soperj.com.br/wp-content/uploads/2022/01/vacina-covid-768x576.png" alt="" />
                        <p className='azul-claro'>Mitos e verdade sobre a vacinação contra o COVID.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
