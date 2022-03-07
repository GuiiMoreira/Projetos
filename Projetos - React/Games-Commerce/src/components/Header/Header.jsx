import profileImg from '../../assets/profileImg.jpg';
import SearchInput from '../SearchInput/SearchInput';
import "./Header.css";

export default function Header({
    setMoviesNameFilter,
}) {
    return (
        <header className="header">
            <p>Guii <span className="header-logo">Games Store</span></p>
            <SearchInput setMoviesNameFilter={setMoviesNameFilter} />
            <div className="header-item-container">
                Bem vindo
                <img
                    className="item-container-img"
                    src={profileImg}
                    alt="profile"
                />
            </div>
        </header>
    );
}
