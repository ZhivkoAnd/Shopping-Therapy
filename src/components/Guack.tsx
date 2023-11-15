import React, { useEffect, useState } from 'react'

const Guack = () => {

const [active, setActive] = useState(1)

const guackArray = Array(9).fill(<div className='guack-grid-element'>1</div>)

const handleClick = (index: number) => {
   console.log(index === active ? 'sucess' : 'fail')   
}

useEffect(()=> {
 const interval = setInterval(()=> {
    setActive(Math. floor(Math. random()* 9))
 },2000);

 () => {
    clearInterval(interval)
 }
},[])

console.log(active)

  return (
    <div className='guack-grid-container'>
    <div className='guack-grid'>
      {guackArray.map((mole, index)=> {
        return <div className='guack-grid-element' onClick={() =>handleClick(index)} style={{backgroundColor: index === active ? 'blue' : 'red'}}>{mole}</div>
      })}
    </div>
    </div>
  )
}

export default Guack