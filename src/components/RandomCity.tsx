import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RandomCity = () => {
  const [correctCity, setCorrectCity] = useState<any>("");
  const [answers, setAnswers] = useState<any>("");

  const randomCityQuery = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data } = useQuery(["random-city"], randomCityQuery, {
    onSuccess: (data) => {
      const correctCity = data[Math.floor(Math.random() * data.length)].title;
      setCorrectCity(correctCity);
    },
  });

  //   const random = () => {
  //     return data && data[Math.floor(Math.random() * data.length)].title;
  //   };

  console.log(correctCity);
  return <div></div>;
};

export default RandomCity;
