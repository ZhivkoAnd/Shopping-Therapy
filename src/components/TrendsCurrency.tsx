import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Trends = () => {
  const queryClient = useQueryClient();

  const fetchFruitsQuery = async (
    today: any,
    yesterday: any,
    twoDaysAgo: any,
    threeDaysAgo: any,
    fourDaysAgo: any,
    fiveDaysAgo: any,
    sixDaysAgo: any,

    currency: any
  ) => {
    return Promise.all([
      fetch(`https://api.exchangerate.host/${today}?symbols=${currency}`).then(
        (res) => res.json()
      ),
      fetch(
        `https://api.exchangerate.host/${yesterday}?symbols=${currency}`
      ).then((res) => res.json()),
      fetch(
        `https://api.exchangerate.host/${twoDaysAgo}?symbols=${currency}`
      ).then((res) => res.json()),
      fetch(
        `https://api.exchangerate.host/${threeDaysAgo}?symbols=${currency}`
      ).then((res) => res.json()),
      fetch(
        `https://api.exchangerate.host/${fourDaysAgo}?symbols=${currency}`
      ).then((res) => res.json()),
      fetch(
        `https://api.exchangerate.host/${fiveDaysAgo}?symbols=${currency}`
      ).then((res) => res.json()),
      fetch(
        `https://api.exchangerate.host/${sixDaysAgo}?symbols=${currency}`
      ).then((res) => res.json()),
    ]);
  };

  const [currency, setCurrency] = useState<any>("CAD");
  const [date, setDate] = useState<any>("2023-03-02");

  const today = new Date();
  const yesterday = subDays(today, 1);
  const twoDaysAgo = subDays(today, 2);
  const threeDaysAgo = subDays(today, 3);
  const fourDaysAgo = subDays(today, 4);
  const fiveDaysAgo = subDays(today, 5);
  const sixDaysAgo = subDays(today, 6);

  const formatDate = (date: any) => {
    return format(date, "yyyy-MM-dd");
  };

  const { data, isLoading, isError } = useQuery(
    [
      "currencies",
      formatDate(today),
      formatDate(yesterday),
      formatDate(twoDaysAgo),
      formatDate(threeDaysAgo),
      formatDate(fourDaysAgo),
      formatDate(fiveDaysAgo),
      formatDate(sixDaysAgo),
      currency,
    ],
    () =>
      fetchFruitsQuery(
        formatDate(today),
        formatDate(yesterday),
        formatDate(twoDaysAgo),
        formatDate(threeDaysAgo),
        formatDate(fourDaysAgo),
        formatDate(fiveDaysAgo),
        formatDate(sixDaysAgo),
        currency
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Improve this

  const clicked = (key: string) => {
    setCurrency(key);
    setDate(formatDate(today));
  };

  // Promise.allSettled()

  console.log(data);

  const list = [];

  // if (data) {
  // for (const [key, value] of Object.entries(data.rates)) {
  // list.push(
  // <button key={key} onClick={() => clicked(key)}>
  // <>{key}</>:<>{value}</>
  // </button>
  // );
  // }
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // <>
    // <div className="container">{list}</div>
    // {currency && <div>{currency}</div>}
    // {currency ? (
    // <div>
    // <Line
    // data={{
    // labels: [
    // formatDate(sixDaysAgo),
    // formatDate(fiveDaysAgo),
    // formatDate(fourDaysAgo),
    // formatDate(threeDaysAgo),
    // formatDate(twoDaysAgo),
    // formatDate(yesterday),
    // formatDate(today),
    // ],
    // datasets: [
    // {
    // label: "Day Rate",
    // data: [
    // "1","2","3","4","5","6","7",
    // ],
    // backgroundColor: "transparent",
    // borderColor: "#b30000",
    // borderWidth: 1,
    // },
    // ],
    // }}
    // height={200}
    // width={200}
    // options={{ maintainAspectRatio: false }}
    // ></Line>
    // <div className="buttons">
    // {/ <button className="min">MINIMUM {minValue} </button>
    // <button className="max">MAXIMUM {maxValue}</button> /}
    // </div>
    // </div>
    // ) : (
    // ""
    // )}
    // </>
    <></>
  );
};

export default Trends;
