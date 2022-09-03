import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link, useHistory } from 'react-router-dom';
import iconProgressoCadastro from '../../assets/cadastro/cadastro-senha-progresso.svg';
import iconEsconderSenha from '../../assets/esconderSenha.svg';
import iconMostrarSenha from '../../assets/mostraSenha.svg';
import { auth } from "../../context/config";
import useGlobal from '../../hooks/useGlobal';
import { set, ref } from "firebase/database";
import { db } from '../../context/config';



function EscolherSenha() {
  const history = useHistory();
  const { nomeEmail } = useGlobal();
  const [errorRegister, setErrorRegister] = useState();
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false)
  const [values, setValues] = useState({
    password: '',
    cofirmPassword: '',
    showPassword: false
  });

  async function handleCadastrarUsuario(event) {
    event.preventDefault();

    const user = {
      email: nomeEmail.email,
      nome: nomeEmail.nome,
      senha: values.password
    };

    try {
      const resposta = await createUserWithEmailAndPassword(auth, user.email, user.senha);

      if (resposta) {
        const uuid = resposta.user.uid
        set(ref(db, `/users/${uuid}`), {
          id: uuid,
          email: nomeEmail.email,
          nome: nomeEmail.nome,
          senha: values.password
        });
        history.push('/Success');
      }
    } catch (error) {
      console.log(error);
      setErrorRegister(true)
    }
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

        <form onSubmit={handleCadastrarUsuario} className="form-cadastro">
          <div>
            <label htmlFor="senha">Senha*</label>
            <div className='container-input-senha-login'>
              <input
                placeholder='Digite sua senha'
                type={mostrarSenha ? 'text' : 'password'}
                required
                name='senha'
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <img className='icon-senha-login'
                src={mostrarSenha ? iconEsconderSenha : iconMostrarSenha} alt=""
                onClick={() => mostrarSenha ? setMostrarSenha(false) : setMostrarSenha(true)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmSenha">Repita a senha*</label>
            <div className='container-input-senha-login'>
              <input
                placeholder='Digite novamente a senha'
                type={mostrarConfirmSenha ? 'text' : 'password'}
                required
                name='confirmSenha'
                onChange={(e) =>
                  setValues({ ...values, cofirmPassword: e.target.value })}
              />
              <img className='icon-senha-login'
                src={mostrarConfirmSenha ? iconEsconderSenha : iconMostrarSenha} alt=""
                onClick={() => mostrarConfirmSenha ? setMostrarConfirmSenha(false) : setMostrarConfirmSenha(true)}
              />
            </div>
            {errorRegister && <p className='erro-login'>Email já cadastrado</p>}
          </div>
          <button className="form-button" disabled={values.password === values.cofirmPassword ? false : true}> Cadastrar </button>
          <p className="txt-link">
            Já possui uma conta? Faça seu
            <Link to="/Login" className='links-login'> Login</Link>
          </p>
        </form>
      </div >
    </div >
  );
}

export default EscolherSenha;
