import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"

const Testing = () => {

  const [activePokemon, setActivePokemon] = useState('')

  const fetchPokemons = async () => {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon/')
    return pokemons.json()
  }

    const fetchSpecificPokemon = async (pokemon: {}) => {
    const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return pokemons.json()
  }

  const {data} = useQuery(['pokemons'], fetchPokemons)
  const {data: pokemon} = useQuery(['pokemon', activePokemon], () => fetchSpecificPokemon(activePokemon))

  const nameRef = useRef<any>('')

  const submitPokemon = (e: any) => {
    e.preventDefault()
    setActivePokemon(nameRef.current.value)
  }

  console.log(nameRef.current.value)

  return (
    <div>
      {data?.results?.map((pokemon: {name: string}) => {
        return <button key= {pokemon.name} onClick={() => setActivePokemon(pokemon.name)}>{pokemon.name}</button>
      })}
      <div>{pokemon ? pokemon.id : ''}</div>
      <form onSubmit={submitPokemon}>
        <input ref={nameRef}/><br/>
        <button type="submit" >Find me</button>
      </form>
    </div>
  )
}

export default Testing