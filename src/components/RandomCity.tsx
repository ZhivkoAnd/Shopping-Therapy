import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";

const RandomCity = () => {
  const [correctCity, setCorrectCity] = useState<any>("");
  const [answersArray, setAnswersArray] = useState<any>("");
  const [userAnswer, setUserAnswer] = useState<any>("Start");
  const [selectedButtonId, setSelectedButtonId] = useState<any>("");

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
  }, [data]);

  // I make a set where I put the correctCity, and then fill it with random answers untill it reaches 4 answers
  const startGame = () => {
    setUserAnswer("Start");
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

  console.log(userAnswer);
  const checkAnswer = (image: any) => {
    if (correctCity.image === image) {
      setUserAnswer("Correct");
    } else {
      setUserAnswer("Wrong");
    }
  };

  const newGame = () => {
    setSelectedButtonId("");
    setUserAnswer("Start");
    startGame();
  };

  return (
    <div className="random-city">
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
                  ? userAnswer === "Correct"
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
        {userAnswer === "Correct" && (
          <>
            <div className="random-cty__correct-answer">Correct !</div>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={newGame}>
              New game ?
            </Button>
          </>
        )}
        {userAnswer === "Wrong" && (
          <div className="random-cty__correct-answer">Wrong answer !</div>
        )}

        {userAnswer === "Start" && (
          <div className="random-cty__correct-answer"></div>
        )}
      </div>
    </div>
  );
};

export default RandomCity;
