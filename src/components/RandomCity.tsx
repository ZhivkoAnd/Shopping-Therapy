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

  let city: any = [];
  const randomCity = () => {
    if (data) {
      for (let i = 0; i < 3; i++)
        city.push(data[Math.floor(Math.random() * data.length)]);
    }
  };

  randomCity();
  console.log(city);

  useEffect(() => {
    setAnswers([correctCity, ...city]);
  }, []);

  console.log(answers);

  return <div>{answers.map((e: any) => e.title)}</div>;
};

export default RandomCity;
