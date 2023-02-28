import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Trends = () => {
  const queryClient = useQueryClient();

  // Get all Fruits

  //localhost:4000/products?category=Veggies&_sort=price

  const fetchFruitsQuery = async () => {
    const response = await fetch(
      `https://openexchangerates.org/api/historical/2010-10-10.json?app_id=2739d7cc6d4540d0a89b9efa791dab59`
    );
    return response.json();
  };

  const { data, isLoading, isError } = useQuery(["pokemons"], fetchFruitsQuery);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <></>;
};

export default Trends;
