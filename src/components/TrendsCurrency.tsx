import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// Get Last 7 days of the week and then make them the right format

// Calculating the maximum and minimum value for each currency for the past week

//   const maxArray = [date, date1, date2, date3, date4, date5, date6];
//   const maxValue = Math.max(...maxArray);

//   const minArray = [date, date1, date2, date3, date4, date5, date6];
//   const minValue = Math.min(...minArray);

// const maxValue = Math.max(...values);
// const minValue = Math.min(...values);

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
      keepPreviousData: true,
    }
  );
  // Promise.allSettled()

  const rates: any = data?.slice(1).map((e: any) => e.rates[currency]);

  const list = [];

  //    <>{key}</>:<>{value}</>
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
              labels: [
                formatDate(sixDaysAgo),
                formatDate(fiveDaysAgo),
                formatDate(fourDaysAgo),
                formatDate(threeDaysAgo),
                formatDate(twoDaysAgo),
                formatDate(yesterday),
                formatDate(today),
              ],
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
          <div className="buttons"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Trends;
