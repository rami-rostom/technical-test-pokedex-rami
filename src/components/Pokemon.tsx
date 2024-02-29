/* eslint-disable @next/next/no-img-element */
import { graphql, useLazyLoadQuery } from 'react-relay'
import { PokemonQuery } from '../../__generated__/PokemonQuery.graphql'
import Link from 'next/link'

const GRAPHQL = graphql`
  query PokemonQuery($pokemonId: Int!) {
    sprites: pokemon_v2_pokemon_by_pk(id: $pokemonId) {
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
    pokemon: pokemon_v2_pokemonspecies(where: {id: {_eq: $pokemonId}}) {
      name
      capture_rate
      color: pokemon_v2_pokemoncolor {
        name
      }
      generation: pokemon_v2_generation {
        generationId: id
        name
      }
      evolution: pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies {
          pokemonId: id
          name
        }
      }
    }
  }
`

// TODO : Display the informations you want about the Pokemon, add a bit of styling
export const Pokemon = ({ pokemonId }: { pokemonId: number }) => {
  const data = useLazyLoadQuery<PokemonQuery>(GRAPHQL, { pokemonId });

  const pokemonData = data.pokemon[0];
  const evolution = pokemonData?.evolution?.pokemon_v2_pokemonspecies;

  return (
    <div className='page'>
      <Link href={'/'} className="page__title">
        <h1>Pokedex</h1>
      </Link>

      <div>
        <h2>{pokemonData?.name}</h2>
        <img src={data.sprites?.sprites[0].sprites.front_default} alt={pokemonData?.name} />
        <p>Génération {pokemonData?.generation?.generationId}</p>
        <p>Capture rate : {pokemonData?.capture_rate}</p>

        <div>
          {evolution?.map((pokemon) => (
            <p key={pokemon.pokemonId}>
            <Link  href={`/pokemon?id=${pokemon.pokemonId}`}>
              {pokemon.name}
            </Link>
            </p>
          ))}
        </div>
      </div>

      <button>
        <Link href={'/'}>Retour à l'accueil</Link>
      </button>
    </div>
  )
}

export default Pokemon
