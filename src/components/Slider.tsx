import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Slider = () => {
  const [index, setIndex] = useState(1);

  // Fetch specific city
  const fetchCity = async (index: any) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/cities/${index}`
    );
    return response.json();
  };

  // Fetch all cities
  const fetchCities = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  // To get a specific element from the data received, we have to pass the index from the state to the query function
  const { data: city } = useQuery(["city", index], () => fetchCity(index));
  const { data: cities } = useQuery(["cities"], fetchCities);

  const nextItem = () => {
    setIndex((index) => checkNumber(index + 1));
  };

  const previousItem = () => {
    setIndex((index) => checkNumber(index - 1));
  };

  console.log(cities);

  const checkNumber = (number: any) => {
    // if the number is bigger than the last item in the array, return 0(the first item).
    // It's data.length - 1, because arrays are 0-based. So if it's 0,1,2,3, last item will be the length(4) - 1 = 3
    if (number > cities.length) {
      return 1;
    }
    // if the number is less than 0, return the last item in the array
    if (number < 1) {
      return cities.length;
    }
    // in neither of those cases, return the number
    return number;
  };

  return (
    <>
      {city?.title}
      <button onClick={nextItem}>Next</button>
      <button onClick={previousItem}>Previous</button>
      <button>random</button>
    </>
  );
};

export default Slider;
