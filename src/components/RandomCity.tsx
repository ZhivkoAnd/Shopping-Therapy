import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RandomCity = () => {
  const [randomCity, setRandomCity] = useState("");

  const randomCityQuery = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data } = useQuery(["random-city"], randomCityQuery, {
    onSuccess: (data) => {
      const randomCity = data[Math.floor(Math.random() * data.length)];
      setRandomCity(randomCity);
    },
  });

  console.log(randomCity);

  return <div>RandomCity</div>;
};

export default RandomCity;
