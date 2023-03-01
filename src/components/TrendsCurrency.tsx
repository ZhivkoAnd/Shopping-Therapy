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
    ["currencies", date, currency],
    () => fetchFruitsQuery(date, date),
    {
      refetchOnWindowFocus: false,
    }
  );

  const list = [];

  if (data) {
    for (const [key, value] of Object.entries(data.rates)) {
      list.push(
        <button key={key}>
          <>{key}</>: <>{value}</>
        </button>
      );
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="container">{list}</div>;
};

export default Trends;
