/* eslint-disable @next/next/no-img-element */
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

  return (
    <div className="p-4">
      <h1 className="mb-5">Pokemons :</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.pokemons.map(pokemon => {
          const sprite = pokemon?.sprites[0]?.sprites?.front_default
          return (
            <div key={pokemon.pokemonId}>
              <div>Name: {pokemon.name}</div>
              <img src={sprite} alt={pokemon.name} />
              <Link href={`/pokemon?id=${pokemon.pokemonId}`}>Infos</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Pokemons
