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


// import { useQuery } from "@tanstack/react-query"
// import { useState } from "react"

// const Testing = () => {

//   const [activePokemon, setActivePokemon] = useState('metapod')
//   const [selectedInput, setSelectedInput] = useState('')
//   const [filteredPokemons, setFilteredPokemons] = useState([])
  
//   const fetchPokemons = async () => {
//     const pokemosnData = await fetch('https://pokeapi.co/api/v2/pokemon/')
//     const pokemons = await pokemosnData.json()
//     return pokemons
//   }

//   const fetchPokemon = async(pokemon: any) => {
//     const kek = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     const lol = await kek.json()
//     return lol
//   }

//   const {data : pokemons} = useQuery(['pokemons'], fetchPokemons)
//   const {data : pokemon} = useQuery(['pokemon', activePokemon], () => fetchPokemon(activePokemon))
 

//    const submitMe = (e: any) => {
//     e.preventDefault()
//     setActivePokemon(selectedInput)
//    }

//    const filter = (string: string) => {
//     const filteredPokemons = pokemons.results.filter((e:any) => e.name.includes(string))
    
//     setFilteredPokemons(selectedInput ? filteredPokemons : pokemons.results)
//    }

//    console.log(filteredPokemons)

//   return (
//     <div>
//        <div>{pokemons?.results?.map((e:any)=> <button onClick={()=>setActivePokemon(e.name)}>{e.name}</button>)}</div>
//        <br/>
//        <div>Pokemon name : {pokemon?.name}</div>
//        <div>Pokemon weight : {pokemon?.weight}</div>
//        <br/>
//        <form onSubmit={submitMe}>
//       <input value={selectedInput} onChange={(e: any) => setSelectedInput(e.target.value)}/>
//       <button type='submit'>Submit</button>
//       </form>
//       <br/>
//       <button onClick={() => filter(selectedInput)}>Activate/Deactivate Filter</button>
//       <div>{filteredPokemons?.map((e: {name : string}) => <div>{e.name}</div>)}</div>
//     </div>
//   )
// }

// export default Testing


// type QuestionProps = {
//   id: number,
//   questionTitle: string,
//   answers: []
// }


// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import {useState, useEffect, useRef} from 'react'

// const data = [
//     {
//       id: 1,
//       questionTitle: "What is the capital of France?",
//       answers: [
//         { id: "1a", text: "Paris", is_correct: true },
//         { id: "1b", text: "Berlin", is_correct: false },
//         { id: "1c", text: "Madrid", is_correct: false },
//         { id: "1d", text: "Rome", is_correct: false },
//       ],
//     },
//     {
//       id: 2,
//       questionTitle: "Which planet is known as the Red Planet?",
//       answers: [
//         { id: "2a", text: "Earth", is_correct: false },
//         { id: "2b", text: "Mars", is_correct: true },
//         { id: "2c", text: "Venus", is_correct: false },
//         { id: "2d", text: "Jupiter", is_correct: false },
//       ],
//     },
//   ]

// const Testing = () => {

// const [questions, setQuestions] = useState(data)
// const [selectedAnswer, setSelectedAnswer] = useState<any>()
// const [questionIndex, setQuestionIndex] = useState(1)
// const [results, setResults] = useState(false)
// const [userAnswers, setUserAnswers] = useState([])

// const question = questions.find((e)=> e.id === questionIndex)



// const nextQuestion = () => {
//   if (questionIndex < data.length ) {
//     setQuestionIndex((prev)=> prev + 1)
//     setUserAnswers((prev) => [...prev, question])
//   } else {
//     setUserAnswers((prev) => [...prev, question])
//     setResults(true)
//   }
// }
// const prevQuestion = () => {
//   setQuestionIndex((prev)=> prev - 1)
// }

// const {id , questionTitle, answers} : QuestionProps = question || {}

// console.log(selectedAnswer)

// // sort(() => 0.5 - Math.random())

// return (
//   <>
//    {!results ?
//    <div>
//    <div>
//     {questionTitle}
//    </div>
//    <br/>
//    <div>
//     {answers?.map((e: string)=> (<div>
//     <input type="radio" id={e.id} name="drone" value={e.text} onClick={() => setSelectedAnswer(e.id)}/>
//     <label htmlFor={e.text}>{e.text}</label>
//   </div>))}
//    </div>
  
//    <button onClick={prevQuestion}>Prev</button>
//    <button onClick={nextQuestion}>Next</button>
//    </div> : 'you'}
   
//   </>
// )


// }
// export default Testing



// new Array(29_999_999): This creates a new array with a length of 29,999,999. However, the array is initially empty (it doesn't contain any elements), and all elements are set to undefined.
// .fill(0): This fills all the elements of the array with the value 0. After this step, all 29,999,999 elements in the array will be set to 0.
// .map((_, i) => {...}): This uses the map function to transform each element of the array. The map function takes a callback function that will be called for each element of the array.
// The (_, i) => {...} is an arrow function that takes two parameters. The underscore _ is a convention to indicate that the first parameter (which represents the value of the array element) is not being used in the function. The second parameter i represents the index of the array element.

// The callback function returns an object with two properties:
// id: Set to the index i, so each object in the array will have a unique id corresponding to its index in the array.
// isSelected: Set to true if the index i is equal to 29,999,998, otherwise set to false. This results in only one object in the array having isSelected set to true, and that is the object at index 29,999,998.

// So, the purpose of this code is to create an array of objects, each with a unique id based on its index in the array.
// One of the objects (the one at index 29,999,998) has the isSelected property set to true, while all other objects have isSelected set to false.

const initialItems = new Array(29_999_999).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 29_999_998,
  };
});


import { useMemo, useState } from 'react';

interface DemoProps {}

function Demo({}: DemoProps) {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  
  // find the item whose property of isSelected is true, in this case, it will be the last item
  // Since react rerenders everything when the state is changed, everything is rendered again, when we press the count button, including finding the selectedItem
  // Тhe function has to go through the whole list to find the exact value every time the count changes, so it becomes extremely slow
  const selectedItemTest = items.find((item)=> item.isSelected)


  // То fix that, we memoize the function, so the app remembers the  whole list
  // It means that it will not iterate over every increment, and it will only check the function again, if items or in this case also 'count' are changed.
  // It will run again only if the value in the dependancy array changes
  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [count, items],
  );

  return (
    <div className='tutorial'>
      <h1>Count: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Demo;