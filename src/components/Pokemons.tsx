/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from 'react'
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
`;

// TODO: add pagination for results data
// TODO: add clear input field button in the form
export const Pokemons = () => {
  const data = useLazyLoadQuery<PokemonsQuery>(GRAPHQL, {});

  const [searchValue, setSearchValue] = useState("");

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const searchResult = data.pokemons.filter((pokemon) => pokemon.name.includes(searchValue));

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

      {/* Dynamic render of Pokemons list depending of searchResult value */}
      {searchValue ? (
        <>
        <div className='homepage__result'>
          <p>{searchResult.length} Pokémon correspondant à votre recherche.</p>
        </div>

        <div className="homepage__pokemons">
        {searchResult.map(pokemon => {
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
      </>
      ) : (
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
      )}
    </div>
  )
}

export default Pokemons;
