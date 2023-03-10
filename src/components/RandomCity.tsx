import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";

const RandomCity = () => {
  const [correctCity, setCorrectCity] = useState<any>("");
  const [answersArray, setAnswersArray] = useState<any>("");
  const [userAnswer, setUserAnswer] = useState<any>("");
  const [selectedButtonId, setSelectedButtonId] = useState<any>("");
  const [score, setScore] = useState<any>(0);
  const [seconds, setSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState<any>(false);

  // query to fetch the cities
  const citiesQuery = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data } = useQuery(["random-city"], citiesQuery, {
    refetchOnWindowFocus: false,
  });

  // generate random city based on the received data
  const randomCity = () => {
    return data[Math.floor(Math.random() * data.length)];
  };

  // Initial build of the game
  useEffect(() => {
    startGame();
    setIsRunning(false);
  }, [data]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && !userAnswer && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setUserAnswer(false);
    }

    return () => clearInterval(interval);
  }, [seconds, isRunning, userAnswer]);

  console.log(seconds);

  // I make a set where I put the correctCity, and then fill it with random answers untill it reaches 4 answers
  const startGame = () => {
    if (data) {
      const correctCity = randomCity();
      setCorrectCity(correctCity);
      const mySet = new Set([correctCity]);
      while (mySet.size < 4) {
        const element = randomCity();
        mySet.add(element);
      }
      // finally randomize the answers in the array
      setAnswersArray([...mySet].sort(() => 0.5 - Math.random()));
    }
  };

  const checkAnswer = (image: any) => {
    if (correctCity.image === image) {
      setUserAnswer(true);
      setScore((score: any) => score + 1);
    } else {
      setUserAnswer(false);
      setScore(0);
    }
  };

  const newGame = () => {
    setUserAnswer("");
    setSelectedButtonId("");
    setSeconds(5);
    setIsRunning(true);
    startGame();
  };

  console.log(userAnswer);

  return (
    <div className="random-city">
      <div className="random-city__seconds">Time left: {seconds}</div>
      <div className="random-city__score">Current score: {score}</div>
      <div className="random-city__image">
        {
          <img
            src={correctCity.image}
            style={{ width: "100px", height: "100px" }}
          />
        }
      </div>
      <div className="random-city__answers">
        {answersArray &&
          answersArray.map((e: any) => (
            <Button
              key={e.id}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={
                selectedButtonId === e.id
                  ? userAnswer
                    ? "success"
                    : "error"
                  : "info"
              }
              onClick={() => {
                setSelectedButtonId(e.id);
                checkAnswer(e.image);
              }}
            >
              {e.title}
            </Button>
          ))}
      </div>
      <div className="random-city__new-game">
        {userAnswer === true && (
          <>
            <div className="random-cty__correct-answer">Correct !</div>{" "}
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={newGame}>
              New game ?
            </Button>
          </>
        )}
        {userAnswer === false && seconds && (
          <>
            <div className="random-cty__wrong-answer">Wrong answer!</div>{" "}
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={newGame}>
              New game ?
            </Button>
          </>
        )}
        {seconds === 0 && (
          <div className="random-cty__correct-times-up">Your time is up !</div>
        )}
      </div>
    </div>
  );
};

export default RandomCity;
