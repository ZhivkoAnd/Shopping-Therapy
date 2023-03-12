import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Slider = () => {
  const [index, setIndex] = useState(1);

  // Fetch all cities
  const fetchCities = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data: cities } = useQuery(["cities"], fetchCities);

  const city = cities ? cities[index] : "";

  const nextCity = () => {
    setIndex((index) => checkCityIndex(index + 1));
  };

  const previousCity = () => {
    setIndex((index) => checkCityIndex(index - 1));
  };

  const checkCityIndex = (number: any) => {
    // if the number is bigger than the last item in the array, return 0(the first item).
    // It's data.length - 1, because arrays are 0-based. So if it's 0,1,2,3, last item will be the length(4) - 1 = 3
    if (number > cities.length - 1) {
      return 0;
    }
    // if the number is less than 0, return the last item in the array
    if (number < 1) {
      return cities.length - 1;
    }
    // In neither of those cases, return the number
    return number;
  };

  const randomCity = () => {
    // Get a random value from 0 and the length
    let randomNumber = Math.floor(Math.random() * cities.length);
    // check If that random number and our array length are the same
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    // Finallly we use the checkCity in case the number got bigger than the last item of the array
    setIndex(checkCityIndex(randomNumber));
  };

  return (
    <>
      <div>{city?.title}</div>
      <button onClick={nextCity}>Next</button>
      <button onClick={previousCity}>Previous</button>
      <button onClick={randomCity}>random</button>
    </>
  );
};

export default Slider;

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";

// const Slider = () => {
//   const [index, setIndex] = useState(1);

//   // Fetch specific city
//   const fetchCity = async (index: any) => {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_KEY}/cities/${index}`
//     );
//     return response.json();
//   };

//   // Fetch all cities
//   const fetchCities = async () => {
//     const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
//     return response.json();
//   };

//   // To get a specific element from the data received, we have to pass the index from the state to the query function
//   const { data: city } = useQuery(["city", index], () => fetchCity(index));
//   const { data: cities } = useQuery(["cities"], fetchCities);

//   const nextCity = () => {
//     setIndex((index) => checkCityIndex(index + 1));
//   };

//   const previousCity = () => {
//     setIndex((index) => checkCityIndex(index - 1));
//   };

//   const checkCityIndex = (number: any) => {
//     // Unlike the previous scenario, where we use the indexes of the array , here we set the id of the objects
//     if (number > cities.length) {
//       return 1;
//     }
//     // if the number is less than 1, return the object with the last id
//     if (number < 1) {
//       return cities.length;
//     }
//     // in neither of those cases, return the number
//     return number;
//   };

//   const randomCity = () => {
//     // Get a random value from 0 and the length
//     let randomNumber = Math.floor(Math.random() * cities.length);
//     // check If that random number and our array length are the same
//     if (randomNumber === index) {
//       randomNumber = index + 1;
//     }
//     // Finallly we use the checkCity in case the number got bigger than the last item of the array
//     setIndex(checkCityIndex(randomNumber));
//   };

//   return (
//     <>
//       {city?.title}
//       <button onClick={nextCity}>Next</button>
//       <button onClick={previousCity}>Previous</button>
//       <button onClick={randomCity}>random</button>
//     </>
//   );
// };

// export default Slider;
