import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

const Pokemons = () => {

  const [pokemon, setPokemon] = useState<any>("")

  const fetchAllPokemons = async() =>{
    const fetchedPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    return fetchedPokemons.json()
  }

  // We want to fetch the passed pokemon
  const fetchSpecificPokemon = async(pokemon: {}) =>{
    const fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    return fetchedPokemon.json()
  }

  const {data: allPokemons} = useQuery(['pokemons'], fetchAllPokemons) // Fetch all pokemons and give them 'pokemons' unique id
  const {data: clickedPokemon} = useQuery([pokemon], () => fetchSpecificPokemon(pokemon)) // fetch only the clicked pokemon and give him dynamic id

  return (
    <>
      {allPokemons?.results.map((e: any)=> <button onClick={() =>setPokemon(e.name)}>{e.name}</button>)}
      <div>Id : {clickedPokemon?.id}</div>
    </>
  )
}


export default Pokemons