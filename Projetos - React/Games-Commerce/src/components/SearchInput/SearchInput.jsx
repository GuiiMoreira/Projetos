import SearchIcon from '../../assets/search-icon.svg';
import './SearchInput.css';

export default function SearchInput({ setGameName, menu, gameName }) {

    return (
        <div className={`search-container ${menu}`}>
            {console.log(gameName)}
            <input className="search-container-input" value={gameName} type="text" placeholder="Pesquisar jogo..." onChange={e => setGameName(e.target.value)} />
            <img src={SearchIcon} alt='pesquisar' className="search-container-icon" />
        </div>
    );
}