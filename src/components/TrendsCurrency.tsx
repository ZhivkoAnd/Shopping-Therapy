import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { Line } from "react-chartjs-2";
import LoadingSpinners from "./ui/LoadingSpinners";
import "chart.js/auto";

const Trends = () => {
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
      fetch(`https://api.exchangerate.host/latest`).then((res) => res.json()),
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

  const formatedDates = [
    formatDate(today),
    formatDate(yesterday),
    formatDate(twoDaysAgo),
    formatDate(threeDaysAgo),
    formatDate(fourDaysAgo),
    formatDate(fiveDaysAgo),
    formatDate(sixDaysAgo),
  ];

  const { data, isLoading, isError } = useQuery(
    ["currencies", [...formatedDates], currency],
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
      keepPreviousData: true,
    }
  );
  // Promise.allSettled()

  // Get the rates for each of the fetched dates, but remove the first item before mapping
  const rates: any = data?.slice(1).map((e: any) => e.rates[currency]);

  const list = [];

  //    <>{key}</>:<>{value}</>
  // Map through the list of all the currencies with "latest" date and push them into a new array
  if (data) {
    for (const [key, value] of Object.entries(data[0].rates)) {
      list.push(
        <button
          className="trends__button"
          key={key}
          onClick={() => setCurrency(key)}
        >
          <>{key}</>
        </button>
      );
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trends">
      <div className="trends__list">{list}</div>
      {currency && <div className="trends__selected-currency">{currency}</div>}
      {currency ? (
        <div>
          <Line
            data={{
              labels: [...formatedDates],
              datasets: [
                {
                  label: "Day Rate",
                  data: [...rates],
                  backgroundColor: "transparent",
                  borderColor: "#b30000",
                  borderWidth: 1,
                },
              ],
            }}
            height={200}
            width={200}
            options={{ maintainAspectRatio: false }}
          ></Line>
        </div>
      ) : (
        ""
      )}

      {rates.every((e: any) => e !== undefined) ? (
        <div className="trends__values">
          <div className="trends__values-max">
            Max: {Math.round(Math.max(...rates))}
          </div>
          <div className="trends__values-min">
            Min: {Math.round(Math.min(...rates))}
          </div>
        </div>
      ) : (
        <>
          <LoadingSpinners three_dots />
          <LoadingSpinners three_dots />
        </>
      )}
    </div>
  );
};

export default Trends;
