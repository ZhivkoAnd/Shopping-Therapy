import { useEffect, useRef, useState } from "react";

const Testing = () => {

  const [active, setActive] = useState(1)
  const [currentScore, setCurrentScore] = useState(0)
  
  // Creates an array with 9 elements, where each element has an id property
  const holes = Array.from({ length: 9 }, (_, index) => ({ id: index + 1 }));

 useEffect(() => {
 const timeout = setInterval(() => {
    setActive((active) => active !== holes.length ? Math.floor(Math.random() * 9) + 1 : 1)
  }, 1000)

   return () => {
      clearInterval(timeout)
   }
 },[active])


 const checkAnswer = (id: number) => {
  id === active ?  setCurrentScore((score) => score + 1) : setCurrentScore(0)
 }

  return (
    <>
       {currentScore}
      <div>
      {holes.map((e) => {
        return <div>
          <div>
            <div style={{width: '50px', height: '50px', backgroundColor: active === e.id ? 'green' : 'red'}}></div>
           <button onClick={() => checkAnswer(e.id)}>{e.id}</button>
          </div>
        </div>
      })}
      </div>
    </>
  );
};

export default Testing;
