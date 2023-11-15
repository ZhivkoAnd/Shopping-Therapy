// import React, { useEffect, useState } from "react";

// // The function you create inside component function is a closure that captures the values at the moment it's created.
// // When that function runs, all variables it has access to are from the moment its created and not after the component re-renders, which create the closure again with new values for the variables.

// const Testing = () => {
//   const [count, setCount] = useState(0);

//   // Solution 1
//   const handleClick = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     fetch(`http://127.0.0.1:5173/${newCount}`);
//   };

//   // Solution 2

//   //   const handleClick = () => {
//   //     setCount((e) => e + 1);
//   //   };

//   //   useEffect(() => {
//   //     fetch(`http://127.0.0.1:5173/${count}`);
//   //   }, [count]);

//   //Solution 3 - bad

//   //   const handleClick = () => {
//   //     const newCount = count + 1;
//   //     setCount((e) => {
//   //       fetch(`http://127.0.0.1:5173/${newCount}`);
//   //       return e + 1;
//   //     });
//   //   };

//   return <button onClick={handleClick}>{count}</button>;
// };

// export default Testing;


// import {useState, useEffect} from 'react'

// type User = {
//   picture: {
//     thumbnail: string
//   }
//   name: {
//     first: string
//     last: string
//   }
// }

// const Testing = () => {

// const [users, setUsers] = useState<any>([])
// const [pageNumber, setPageNumber] = useState(1)

// useEffect(() => {
//   (async() => {
//    const fetchUsers = await fetch(`https://randomuser.me/api?page=${pageNumber}`)
//    const fetchedUsers = await fetchUsers.json()
//    setUsers((oldResults:[]) => [...oldResults, ...fetchedUsers.results])
//   })()
// },[pageNumber])

// const fetchUser = () => {
//   setPageNumber(pageNumber => pageNumber + 1)
// }

//   return (
//     <>    <button onClick={fetchUser}>Fetch another user</button>
//     {users?.map((e: User)=> {
//       return <>
//       <img src={e.picture?.thumbnail}/>
//       <div>{e.name?.first} {e.name?.last}</div>
//       </>
//     })}</>
//   )
// }


// export default Testing


import {useState, useEffect} from 'react'

const Testing = () => {

  // Set up the initial 2D grid. TS is an array that consits of array of numbers
  const [grid, setGrid] = useState<number[][]>([
    [0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
  ])

  
 const setGridValue = (rowIndex: number, columnIndex: number, value: number) => {
  const newGrid = [...grid]
  newGrid[rowIndex][columnIndex] = value
  setGrid(newGrid)
 }

// React is automatically converting the inner arrays into their string representations and rendering them.
// When you return an array from a React component, it gets automatically converted into a string and displayed.
// If you want to display the individual numbers within each cell, then you would use nested map approach.
  return (
    <div className='grid-container'>
      <div className='grid'>    
      {grid.map((row, rowIndex) => {
        return <div key={rowIndex}>{row.map((number, columnIndex) => {
          return <div key={columnIndex} className='cell'><input type='number' value={number} onChange={(e) =>setGridValue(rowIndex, columnIndex, parseInt(e.target.value) || 0)}/></div>
        })}</div>
      })}
      </div>
    </div>
  )
}


export default Testing