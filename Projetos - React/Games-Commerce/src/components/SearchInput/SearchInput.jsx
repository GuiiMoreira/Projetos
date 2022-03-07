import { useState } from 'react';
import SearchIcon from '../../assets/search-icon.svg';
import './SearchInput.css';

export default function SearchInput({ setMoviesNameFilter }) {
    const [search, setSearch] = useState('');

    function handleKeyPress(e) {
        if (e.key !== 'Enter') return;

        setMoviesNameFilter(search);
    }

    return (
        <div className="search-container">
            <input className="search-container-input" type="text" placeholder="Pesquisar jogo..." onChange={e => setSearch(e.target.value)} onKeyPress={e => handleKeyPress(e)} />
            <img src={SearchIcon} alt='pesquisar' className="search-container-icon" onClick={() => setMoviesNameFilter(search)} />
        </div>
    );
}