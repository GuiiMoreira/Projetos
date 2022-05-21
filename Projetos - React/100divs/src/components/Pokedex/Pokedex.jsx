import { useState } from 'react'
import './Pokedex.css'

export default function Pokedex() {
    const [searchPokemon, setSearchPokemon] = useState('')
    const [pokemon, setPokemon] = useState(null)


    async function handleSearchPokemon(pokemon) {
        const url = "https://pokeapi.co/api/v2/pokemon/"

        const response = await fetch(url + searchPokemon)
        const data = await response.json()

        setPokemon(data)
        console.log(data)
    }


    return (
        <div className="container-pokedex">
            <div className='pokedex'>
                <div className="pokedex-lado-esquerdo">
                    <div className='pokemon-foto-nome'>
                        {pokemon &&
                            <div className='pokemon-info'>
                                <img src={pokemon.sprites.front_default} alt="" />
                                <p>{pokemon.name}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="pokedex-lado-direito">
                    <div>
                        {pokemon && pokemon.abilities.map((ability => {
                            return (
                                <p>{ability.ability.name}</p>
                            )
                        }))}
                    </div>
                    <input type="text" value={searchPokemon} name="" id="" onChange={(e) => setSearchPokemon(e.target.value)} />
                    <button onClick={() => handleSearchPokemon(searchPokemon)}></button>
                </div>
            </div>
        </div>

    )
}