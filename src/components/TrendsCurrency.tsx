import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Trends = () => {
  const queryClient = useQueryClient();

  //       `https://api.currencyapi.com/v3/historical?apikey=cQzoqbcrYtVvquShOKnJXnN4ND2H3EoN86os9IQg&currencies=EUR&date=2023-02-27`
  //      `https://api.currencyapi.com/v3/historical?apikey=cQzoqbcrYtVvquShOKnJXnN4ND2H3EoN86os9IQg&currencies=${currency}&date=${date}`

  const fetchFruitsQuery = async (currency: any, date: any) => {
    const response = await fetch(
      `https://api.currencyapi.com/v3/historical?apikey=cQzoqbcrYtVvquShOKnJXnN4ND2H3EoN86os9IQg&currencies=EUR,BGN&date=2023-02-27`
    );
    return response.json();
  };

  const [currency, setCurrency] = useState<any>("CAD");
  const [date, setDate] = useState<any>("2023-02-27");

  const { data, isLoading, isError } = useQuery(
    ["pokemons", currency, date],
    () => fetchFruitsQuery(currency, date)
  );

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <></>;
};

export default Trends;
