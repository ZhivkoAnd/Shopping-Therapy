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
      setAnswers([...mySet]);
    }
  };

  const checkImage = (image: any) => {
    if (correctCity.image === image) {
      setCorrectAnswer(true);
      console.log("true");
    } else {
      setCorrectAnswer(false);
      console.log("false");
    }
  };

  const newGame = () => {
    setCorrectAnswer(false);
  };

  return (
    <div>
      {correctAnswer && <button onClick={newGame}>new game ?</button>}
      {
        <img
          src={correctCity.image}
          style={{ width: "100px", height: "100px" }}
        />
      }
      {answers &&
        answers
          .map((e: any) => (
            <button key={e.id} onClick={() => checkImage(e.image)}>
              {e.title}
            </button>
          ))
          .sort(() => 0.5 - Math.random())}
    </div>
  );
};

export default RandomCity;
