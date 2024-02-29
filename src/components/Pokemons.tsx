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
// TODO: add light and dark mode toggle (style is already adapt for light and dark mode)
// TODO: work on global style, add more color
// TODO: add media queries under 600px 
export const Pokemons = () => {
  const data = useLazyLoadQuery<PokemonsQuery>(GRAPHQL, {});

  const [searchValue, setSearchValue] = useState("");

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const searchResult = data.pokemons.filter((pokemon) => pokemon.name.includes(searchValue));

  return (
    <div className="page">
      <Link href={'/'} className="page__title">
        <h1>Pokedex</h1>
      </Link>

      <form className="page__search">
        <input
          type="text"
          className="page__search-input"
          placeholder="Rechercher un Pokemon"
          value={searchValue}
          onChange={handleChangeValue}
        />
      </form>

      {/* Dynamic render of Pokemons list depending of searchResult value */}
      {searchValue ? (
        <>
        <div className='page__result'>
          <p>{searchResult.length} Pokémon correspondant à votre recherche.</p>
        </div>

        <div className="page__pokemons">
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
        <div className="page__pokemons">
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
