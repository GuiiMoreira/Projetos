import SearchIcon from '../../assets/search-icon.svg';
import './SearchInput.css';

export default function SearchInput({ setGameName }) {

    return (
        <div className="search-container">
            <input className="search-container-input" type="text" placeholder="Pesquisar jogo..." onChange={e => setGameName(e.target.value)} />
            <img src={SearchIcon} alt='pesquisar' className="search-container-icon" />
        </div>
    );
}