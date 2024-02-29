'use client'

import Pokemon from '@/components/Pokemon'
import { useSearchParams } from 'next/navigation'

export default function PokemonView() {
  const searchParams = useSearchParams()

  const pokemonId = Number(searchParams.get('id'))
  return <Pokemon pokemonId={pokemonId} />
}
