import './style.css';
import iconLogout from '../../assets/sign-out.svg'
import useGlobal from '../../hooks/useGlobal';

function Menu() {

    const { removeToken } = useGlobal();

    function handleLogout() {
        removeToken();
    }

    return (
        <div className="menu">
            <ul>
                <li>Perfil</li>
                <li>Loja</li>
                <li>Historico</li>
                <li>Favoritos</li>
            </ul>

            <p className="logout-menu" onClick={() => handleLogout()}>Sair <img src={iconLogout} alt="" /></p>
        </div>
    );
}

export default Menu;