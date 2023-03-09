import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RandomCity = () => {
  const [correctCity, setCorrectCity] = useState<any>("");
  const [answers, setAnswers] = useState<any>("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const randomCityQuery = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data } = useQuery(["random-city"], randomCityQuery, {
    onSuccess: (data) => {
      const correctCity = data[Math.floor(Math.random() * data.length)];
      setCorrectCity(correctCity.title);
    },
  });

  const getRandomCity = () => {
    return data && data[Math.floor(Math.random() * data.length)].title;
  };

  const buildArray = () => {
    const mySet = new Set([correctCity]);
    for (let i = 0; i < 4; i++) {
      const element = Math.floor(Math.random() * 100); // generate a random number
      mySet.add(element);
    }
    setAnswers(mySet);
  };

  useEffect(() => {
    // while (mySet.size < 4) {
    //   mySet.add(getRandomCity());
    // }
    buildArray();
  }, [correctCity]);

  console.log(answers);

  //   return <div>{answers.map((e: any) => e.title)}</div>;
  return <></>;
};

export default RandomCity;
