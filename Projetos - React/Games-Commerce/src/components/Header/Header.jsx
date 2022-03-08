import profileImg from '../../assets/profileImg.jpg';
import SearchInput from '../SearchInput/SearchInput';
import "./Header.css";

export default function Header({ setGameName, setMenu, menu, gameName }) {
    return (
        <header className="header">
            <p>Guii <span className="header-logo">Games Store</span></p>
            <SearchInput setGameName={setGameName} menu='no-menu' gameName={gameName} />
            <div className="header-item-container">
                <p>Bem vindo</p>
                <img
                    className="item-container-img"
                    src={profileImg}
                    alt="profile"
                    onClick={() => setMenu(!menu)}
                />
            </div>
        </header>
    );
}
