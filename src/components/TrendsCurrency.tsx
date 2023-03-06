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

  const [selectedCurrency, setSelectedCurrency] = useState<any>("CAD");

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
    ["currencies", [...formatedDates], selectedCurrency],
    () =>
      fetchFruitsQuery(
        formatDate(today),
        formatDate(yesterday),
        formatDate(twoDaysAgo),
        formatDate(threeDaysAgo),
        formatDate(fourDaysAgo),
        formatDate(fiveDaysAgo),
        formatDate(sixDaysAgo),
        selectedCurrency
      ),
    {
      keepPreviousData: true,
    }
  );

  // Get the rates for each of the fetched dates, but remove the first item before mapping
  const currencyRates: any = data
    ?.slice(1)
    .map((e: any) => e.rates[selectedCurrency]);

  const currencyButtonList = [];

  //    <>{key}</>:<>{value}</>
  // Map through the list of all the currencies with "latest" date and push them into a new array
  if (data) {
    for (const [key, value] of Object.entries(data[0].rates)) {
      currencyButtonList.push(
        <button
          className="trends__button"
          key={key}
          onClick={() => setSelectedCurrency(key)}
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
      <div className="trends__list">{currencyButtonList}</div>
      {selectedCurrency && (
        <div className="trends__selected-currency">{selectedCurrency}</div>
      )}
      {selectedCurrency && (
        <div>
          <Line
            data={{
              labels: [...formatedDates],
              datasets: [
                {
                  label: "Day Rate",
                  data: [...currencyRates],
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
      )}

      {currencyRates.every((currency: any) => currency !== undefined) ? (
        <div className="trends__values">
          <div className="trends__values-max">
            Max: {Math.max(...currencyRates)}
          </div>
          <div className="trends__values-min">
            Min: {Math.min(...currencyRates)}
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
