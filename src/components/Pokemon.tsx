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

// TODO: dynamic style depending on pokemon color (like badge or name)
// TODO: add Pokemon image in evolution section
// TODO: add colored style for capture rate. If the rate is low : red. Green if high.
// TODO: make the page more cheerful, colorful.
// TODO: add media queries under 600px 
export const Pokemon = ({ pokemonId }: { pokemonId: number }) => {
  const data = useLazyLoadQuery<PokemonQuery>(GRAPHQL, { pokemonId });

  const pokemonData = data.pokemon[0];
  const evolution = pokemonData?.evolution?.pokemon_v2_pokemonspecies;

  return (
    <div className='page'>
      <Link href={'/'} className="page__title">
        <h1>Pokedex</h1>
      </Link>

      <div className='page__pokemon'>
        <h2 className='page__pokemon-name'>{pokemonData?.name}</h2>

        <img
          src={data.sprites?.sprites[0].sprites.front_default}
          alt={pokemonData?.name}
          className='page__pokemon-img'
        />

        <div className='page__pokemon-info'>
          <div className='page__pokemon-info-generation'>
            Génération {pokemonData?.generation?.generationId}
          </div>

          <div className='page__pokemon-info-capture'>
            Taux de capture : {pokemonData?.capture_rate}
          </div>
        </div>

        {/* Render pokemon evolutions if exist */}
        {evolution && evolution?.length > 1 && (
          <div className='page__pokemon-evolution'>
            {evolution?.map((pokemon) => (
              <Link
                key={pokemon.pokemonId}
                href={`/pokemon?id=${pokemon.pokemonId}`}
                className='page__pokemon-evolution-item'
              >
                {pokemon.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <button className='page__pokemon-btn'>
        <Link href={'/'}>Retour à l'accueil</Link>
      </button>
    </div>
  )
}

export default Pokemon
