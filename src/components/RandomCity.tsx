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
      setCorrectCity(correctCity);
    },
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

  return <div>{answers && answers.map((e: any) => e.title)}</div>;
};

export default RandomCity;
