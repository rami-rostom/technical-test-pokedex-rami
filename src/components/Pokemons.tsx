/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { PokemonsQuery } from '../../__generated__/PokemonsQuery.graphql'
import Link from 'next/link'

const GRAPHQL = graphql`
  query PokemonsQuery {
    pokemons: pokemon_v2_pokemon(limit: 151) {
      pokemonId: id
      name
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`

// TODO : Add a bit of styling
export const Pokemons = () => {
  const data = useLazyLoadQuery<PokemonsQuery>(GRAPHQL, {})

  // To help
  console.log(data)

  const [searchValue, setSearchValue] = useState("");

  const handleChangeValue = (event) => {
    console.log(event);
  }

  return (
    <div className="homepage">
      <h1 className="homepage__title">Pokedex</h1>

      <form className="homepage__search">
        <input
          type="text"
          className="homepage__search-input"
          placeholder="Rechercher un Pokemon"
          value={searchValue}
          onChange={handleChangeValue}
        />
      </form>

      <div className="homepage__pokemons">
        {data.pokemons.map(pokemon => {
          const sprite = pokemon?.sprites[0]?.sprites?.front_default
          return (
            <div key={pokemon.pokemonId} className='pokemons__item'>
              <div className='pokemons__item-name'>{pokemon.name}</div>
              <img src={sprite} alt={pokemon.name} className='pokemons__item-img' />
              <Link href={`/pokemon?id=${pokemon.pokemonId}`} className='pokemons__item-link'>Plus de détails</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pokemons
