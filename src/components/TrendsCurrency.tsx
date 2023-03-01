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
  const [date, setDate] = useState<any>("latest");

  const { data, isLoading, isError } = useQuery(
    ["currencies", date, currency],
    () => fetchFruitsQuery(date, date),
    {
      refetchOnWindowFocus: false,
    }
  );

  const clicked = (key: string) => {
    setCurrency(key);
  };

  const list = [];

  if (data) {
    for (const [key, value] of Object.entries(data.rates)) {
      list.push(
        <button key={key} onClick={() => clicked(key)}>
          <>{key}</>:<>{value}</>
        </button>
      );
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">{list}</div>
      {currency && <div>{currency}</div>}
    </>
  );
};

export default Trends;
