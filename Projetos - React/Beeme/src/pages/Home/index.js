import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import fotoPerfil from '../../assets/foto-perfil.jpg'
import fotoFeed from '../../assets/foto-feed.jpg'
import iconCurtir from '../../assets/icon-curtir.png'
import iconComentar from '../../assets/icon-comentar.png'
import iconFavoritar from '../../assets/icon-favoritar.png'
import iconCompartilhar from '../../assets/icon-compartilhar.png'
// import useGlobal from '../../hooks/useGlobal';
import './styles.css';

function Home() {
  // const { openAddEditModal, setOpenAddEditModal } = useGlobal();

  return (
    <div className="container-home">
      <Header />
      <Menu />
      <div className="content-home">

        <div className="container-publicacao">
          <div className="header-publicacao">
            <div className="usuario-publicacao">
              <img src={fotoPerfil} alt="" className="foto-perfil-publicacao" />
              <p>Guilherme Moreira</p>
            </div>
            <p className="hora-publicacao">6h</p>
          </div>

          <div className="conteudo-publicacao">
            <img src={fotoPerfil} alt="" className="foto-feed" />
          </div>
          <div className="botoes-publicacao">
            <img src={iconCurtir} alt="" className="botao-publicacao" />
            <img src={iconComentar} alt="" className="botao-publicacao" />
            <img src={iconFavoritar} alt="" className="botao-publicacao" />
            <img src={iconCompartilhar} alt="" className="botao-publicacao" />
          </div>
          <p>#tbt do Parque Ibirapuera</p>
        </div>

        <div className="container-publicacao">
          <div className="header-publicacao">
            <div className="usuario-publicacao">
              <img src="https://i.pinimg.com/564x/6b/b7/30/6bb73051a648270929bd613b9f835a14.jpg" alt="" className="foto-perfil-publicacao" />
              <p>Loja prata</p>
            </div>
            <p className="hora-publicacao">6h</p>
          </div>

          <div className="conteudo-publicacao">
            <img src={fotoFeed} alt="" className="foto-feed" />
          </div>
          <div className="botoes-publicacao">
            <img src={iconCurtir} alt="" className="botao-publicacao" />
            <img src={iconComentar} alt="" className="botao-publicacao" />
            <img src={iconFavoritar} alt="" className="botao-publicacao" />
            <img src={iconCompartilhar} alt="" className="botao-publicacao" />
          </div>
          <p>Pratinha Basica</p>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Home;
