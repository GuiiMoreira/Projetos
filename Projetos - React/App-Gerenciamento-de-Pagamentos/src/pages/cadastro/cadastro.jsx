import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './cadastro.css';
import useGlobal from '../../hooks/useGlobal';
import iconProgressoCadastro from '../../assets/cadastro/cadastro-nomeEmail.svg'

function Cadastro() {
  const { nomeEmail, setNomeEmail } = useGlobal()
  const history = useHistory();

  function handleProgredirCadastro(event) {
    event.preventDefault()

    if (!nomeEmail.nome || !nomeEmail.email) {
      return;
    }


    history.push('/Escolhasenha')
  }

  return (
    <div className="body-cadastro">
      <div className="lado-esquerdo-layout-cadastro">
        <img src={iconProgressoCadastro} alt="" className='icon-progresso' />
        <div>
          <p className='titulo-progresso'>Cadastre-se</p>
          <p className='txt-progresso'>Por favor, escreva seu nome e e-mail</p>
          <p className='titulo-progresso'>Escolha uma senha</p>
          <p className='txt-progresso'>Escolha uma senha segura</p>
          <p className='titulo-progresso'>Cadastro realizado com sucesso</p>
          <p className='txt-progresso'>E-mail e senha cadastrados com sucesso</p>
        </div>
      </div>

      <div className="lado-direito-layout-cadastro">
        <h1 className="titulo-cadastro">Adicione seus dados</h1>

        <form onSubmit={handleProgredirCadastro} className="form-cadastro">
          <div>
            <label htmlFor="nome">Nome*</label>
            <input
              placeholder='Digite seu nome'
              required
              name='nome'
              type='text'
              onChange={(e) =>
                setNomeEmail({ ...nomeEmail, nome: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">E-mail*</label>
            <input
              required
              name='email'
              type='email'
              placeholder='Digite seu email'
              onChange={(e) =>
                setNomeEmail({ ...nomeEmail, email: e.target.value })
              } />
          </div>
          <button className="form-button"> Continuar </button>
          <p className="txt-link">
            Já possui uma conta?Faça seu
            <Link to="/Login" className='links-login'> Login</Link>
          </p>

        </form>
      </div >
    </div >
  );
}

export default Cadastro;
