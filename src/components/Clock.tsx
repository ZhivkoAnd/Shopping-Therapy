import { useState, useRef, useEffect} from "react";

const Clock = () => {

  const [inputValue, setInputValue] = useState("");
  const [seconds, setSeconds] = useState(0)

  const timer = useRef<any>(0)
  const renders = useRef(0);

  const inputRef = useRef<any>()  // we gonna use this ref to set focus on the input field

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    renders.current++   // count every time the function is called
  };

  const startTimer = () => {
    if (timer.current !== 0) return
    // we assign the interval to timer.current
      timer.current = setInterval(() => {
         renders.current++
         setSeconds(seconds => seconds + 1)
      }, 1000);
  };

  const pauseTimer = () => {
      clearInterval(timer.current);  // Once we asign the setInterval to the current property, it stores it, so now we can clear it
      timer.current = 0; // sets the timer to 0
  };

  const resetTimer = () => {
    pauseTimer();
    if (seconds) {
        renders.current++
        setSeconds(0)
    }
};

const focusOnInput = () => {
    inputRef.current.focus();
}

//----------------------------------------------- CLOCK ---------------------------------------------------

const [time, setTime] = useState(new Date());
  
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date()); // Update the time state every second
  }, 1000);

  return () => clearInterval(interval);  // Clean up the interval when the component unmounts
}, []);

const hours = time.getHours();
const minutes = time.getMinutes();
const secondss = time.getSeconds();

  return (
    <>
     <div>{hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + secondss : secondss}</div>
     <br></br>
      <div>Renders : {renders.current}</div>
      <br></br>
      <button onClick={focusOnInput}>Focus</button>
      <div>
        {/* The event object is passed to the function automatically by React */}
        <input value={inputValue} onChange={handleChange} ref={inputRef}/>
      </div>
      <br></br>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
      <br></br><br></br>
      <div>Seconds: {seconds}</div>
    </>
  );
};

export default Clock;