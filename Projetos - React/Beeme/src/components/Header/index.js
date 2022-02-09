import fotoPerfil from '../../assets/foto-perfil.jpg';
import iconMenu from '../../assets/icon-menu.svg';


// import SignOutIcon from '../../assets/sign-out.svg';
import useGlobal from '../../hooks/useGlobal';
import './styles.css';

function Header() {

  const { removeToken } = useGlobal();

  function handleLogout() {
    removeToken();
  }

  // function handleOpenMenu() {
  //   console.log('abri')
  // }

  return (
    <header>
      <div className="menu-perfil">
        <img className="icon-menu"
          src={iconMenu}
          alt="Menu"
        />
        <img className="foto-perfil-header"
          src={fotoPerfil}
          alt="Perfil"
          onClick={() => handleLogout()}
        />
        <p>Guilherme Moreira</p>
      </div>
      <p className='title-header'>Bee<span>me</span></p>
    </header>
  );
}

export default Header;