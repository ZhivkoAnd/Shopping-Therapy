import React,{useEffect, useState} from 'react'

const GuessColor = () => {

    const createRandomNumber = () => {
        return `#${Math.floor(Math.random() * 0x1000000).toString(16)}`
     }

    const [color, setColor] = useState(createRandomNumber())
    const [answers, setAnswers] = useState<any>([])
    const [rightAnswer, setRightAnswer] = useState(false)

    const checkColor = (e: any) => {
        if (e.target.textContent === color) {
            setRightAnswer(true)
  
        }
    }

    console.log(color)

  useEffect(()=> {
    const actualColor = createRandomNumber();
    setColor(actualColor)
    setAnswers([actualColor, createRandomNumber(), createRandomNumber()].sort(() => Math.random() - 0.5))
  },[])

  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    <div style={{background: color, height: '200xp', width: '200px' }}>lol</div><br/>
    <div>
    {answers.map((e: any) => {
        return <button onClick={(e) => checkColor(e)} style={rightAnswer ? {background: "green"}: {}}>{e}</button>
    })}
        </div>
    </div>
  )
}

export default GuessColor