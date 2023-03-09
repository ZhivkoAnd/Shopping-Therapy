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
    onSuccess: (data) => {
      const correctCity = data[Math.floor(Math.random() * data.length)];
      setCorrectCity(correctCity);
    },
    refetchOnWindowFocus: false,
  });

  const buildArray = () => {
    if (data) {
      const mySet = new Set([correctCity]);
      while (mySet.size < 4) {
        const element = data[Math.floor(Math.random() * data.length)];
        mySet.add(element);
      }
      setAnswers([...mySet]);
    }
  };

  useEffect(() => {
    buildArray();
  }, [correctCity]);

  console.log(answers);

  const checkImage = (image: any) => {
    if (correctCity.image === image) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  return (
    <div>
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
