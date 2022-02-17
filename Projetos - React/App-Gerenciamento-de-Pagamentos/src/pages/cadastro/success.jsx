import iconProgressoCadastro from '../../assets/cadastro/cadastro-sucesso-progresso.svg'
import iconSucessCadastro from '../../assets/cadastro/cadastro-sucesso.svg'
import { Link } from 'react-router-dom';


function Success() {

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
        <div className='container-sucesso'>
          <img src={iconSucessCadastro} alt="" />
          <p>Cadastro realizado com sucesso</p>
        </div>
        <Link to="/Login"><button className="form-button"> Ir para Login </button></Link>
      </div >
    </div >
  );
}

export default Success;
