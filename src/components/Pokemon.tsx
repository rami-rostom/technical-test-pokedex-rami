/* eslint-disable @next/next/no-img-element */
import { graphql, useLazyLoadQuery } from 'react-relay'
import { PokemonQuery } from '../../__generated__/PokemonQuery.graphql'
import Link from 'next/link'

const GRAPHQL = graphql`
  query PokemonQuery($pokemonId: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $pokemonId) {
      name
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
    details: pokemon_v2_pokemonspecies(where: {id: {_eq: $pokemonId}}) {
      capture_rate
      pokemon_v2_pokemoncolor {
        name
      }
      pokemon_v2_generation {
        name
      }
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies {
          name
        }
      }
    }
  }
`

// TODO : Display the informations you want about the Pokemon, add a bit of styling
export const Pokemon = ({ pokemonId }: { pokemonId: number }) => {
  const data = useLazyLoadQuery<PokemonQuery>(GRAPHQL, { pokemonId })

  // To help
  console.log(data)

  return (
    <div className='page'>
      <Link href={'/'} className="page__title">
        <h1>Pokedex</h1>
      </Link>

      <img src={data.pokemon?.sprites[0].sprites.front_default} alt={data.pokemon?.name} />
    </div>
  )
}

export default Pokemon
