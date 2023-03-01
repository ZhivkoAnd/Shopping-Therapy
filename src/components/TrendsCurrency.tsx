import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Trends = () => {
  const queryClient = useQueryClient();

  const fetchFruitsQuery = async (date: any, currency: any) => {
    const response = await fetch(
      `https://api.exchangerate.host/${date}?symbols=${currency}`
    );
    return response.json();
  };

  const [currency, setCurrency] = useState<any>("CAD");
  const [date, setDate] = useState<any>("2023-02-27");

  const { data, isLoading, isError } = useQuery(
    ["pokemons", date, currency],
    () => fetchFruitsQuery(date, date),
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <></>;
};

export default Trends;
