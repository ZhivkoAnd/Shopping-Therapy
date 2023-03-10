import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RandomCity = () => {
  const [correctCity, setCorrectCity] = useState<any>("");
  const [answers, setAnswers] = useState<any>("");
  const [correctAnswer, setCorrectAnswer] = useState<any>("");

  const randomCityQuery = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data } = useQuery(["random-city"], randomCityQuery, {
    refetchOnWindowFocus: false,
  });

  const randomCity = () => {
    return data[Math.floor(Math.random() * data.length)];
  };

  useEffect(() => {
    buildGame();
  }, [data]);

  const buildGame = () => {
    if (data) {
      const correctCity = randomCity();
      setCorrectCity(correctCity);
      const mySet = new Set([correctCity]);
      while (mySet.size < 4) {
        const element = randomCity();
        mySet.add(element);
      }
      setAnswers([...mySet].sort(() => 0.5 - Math.random()));
    }
  };

  const checkImage = (image: any) => {
    if (correctCity.image === image) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };

  const newGame = () => {
    setCorrectAnswer(false);
    buildGame();
  };

  return (
    <div className="random-city">
      <div className="random-city__new-game">
        {correctAnswer && <button onClick={newGame}>new game ?</button>}
      </div>
      <div className="random-city__image">
        {
          <img
            src={correctCity.image}
            style={{ width: "100px", height: "100px" }}
          />
        }
      </div>
      <div className="random-city__answers">
        {answers &&
          answers.map((e: any) => (
            <button key={e.id} onClick={() => checkImage(e.image)}>
              {e.title}
            </button>
          ))}
      </div>
    </div>
  );
};

export default RandomCity;
