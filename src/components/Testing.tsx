// import React from 'react'
// import {useState, useEffect} from 'react'

// const Testing = () => {

//    const [input, setInput] = useState('')

//    const handleClick = (e:any) => {
//     console.log(e.target.value);
//     setInput(e.target.value)
//    }

//    const submitMe = async (e: any) => {
//     e.preventDefault()
//     const kek = await fetch("https://pokeapi.co/api/v2/pokemon")
//     const lol = await kek.json()
//     const findMe = lol?.results.find((e: {name: string}) => e.name === input)
//     console.log(findMe)
//    }

//   const title = input

//   return (
//     <form onSubmit={submitMe}>
//      <input value={input} onChange={handleClick}/>
//      <h1>{title}</h1>
//      <button type='submit'>Submit</button>
//     </form>
//   )
// }

// export default Testing


import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {useState, useEffect} from 'react'


const Testing = () => {

  const [activePokemon, setActivePokemon] = useState('metapod')

  const fetchPokemons = async(pokemon: any) => {
    const kek = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const lol = await kek.json()
    return lol
  }

  const {data} = useQuery(['pokemons', activePokemon], () => fetchPokemons(activePokemon))

 console.log(data)



  return (
    <>
    <div>{data?.name}</div>
    <button onClick={()=>setActivePokemon('bulbasaur')}>fetch bulba</button>
    </>
  )
}

export default Testing