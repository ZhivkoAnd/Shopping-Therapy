import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { subDays, format } from "date-fns";
import Loading from "./Loading";

const CurrencyExchange = () => {
  // Hooks for the rates and for the dates

  const [listRates, setListRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [ratesToday, setRatesToday] = useState("");
  const [ratesYesterday, setRatesYesterday] = useState("");
  const [ratesTwoDaysAgo, setRatesTwoDaysAgo] = useState("");
  const [ratesThreeDaysAgo, setRatesThreeDaysAgo] = useState("");
  const [ratesFourDaysAgo, setRatesFourDaysAgo] = useState("");
  const [ratesFiveDaysAgo, setRatesFiveDaysAgo] = useState("");
  const [ratesSixDaysAgo, setRatesSixDaysAgo] = useState("");
  const [values, setValues] = useState([]);

  const fetchRates = async () => {
    try {
      const responce = await fetch(`https://api.openrates.io/latest`);
      const listRates = await responce.json();
      setLoading(false);
      setListRates(listRates.rates);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Get Last 7 days of the week and then make them the right format

  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");
  const onedayago = subDays(today, 1);
  const oneDayAgoFormatted = format(onedayago, "yyyy-MM-dd");
  const twodaysago = subDays(today, 2);
  const twoDaysAgoFormatted = format(twodaysago, "yyyy-MM-dd");
  const threedaysago = subDays(today, 3);
  const threeDaysAgoFormatted = format(threedaysago, "yyyy-MM-dd");
  const fourdaysago = subDays(today, 4);
  const fourDaysAgoFormatted = format(fourdaysago, "yyyy-MM-dd");
  const fivedaysago = subDays(today, 5);
  const fiveDaysAgoFormatted = format(fivedaysago, "yyyy-MM-dd");
  const sixdaysago = subDays(today, 6);
  const sixDaysAgoFormatted = format(sixdaysago, "yyyy-MM-dd");

  // Calculating the maximum and minimum value for each currency for the past week

  //   const maxArray = [date, date1, date2, date3, date4, date5, date6];
  //   const maxValue = Math.max(...maxArray);

  //   const minArray = [date, date1, date2, date3, date4, date5, date6];
  //   const minValue = Math.min(...minArray);

  const fetchToday = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${todayFormatted}?symbols=${selectedCurrency}`
      );
      const ratesToday = await responce.json();
      setLoading(false);
      setRatesToday(ratesToday.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchYesterday = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${oneDayAgoFormatted}?symbols=${selectedCurrency}`
      );
      const ratesYesterday = await responce.json();
      setLoading(false);
      setRatesYesterday(ratesYesterday.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchTwoDaysAgo = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${twoDaysAgoFormatted}?symbols=${selectedCurrency}`
      );
      const ratesTwoDaysAgo = await responce.json();
      setLoading(false);
      setRatesTwoDaysAgo(ratesTwoDaysAgo.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchThreeDaysAgo = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${threeDaysAgoFormatted}?symbols=${selectedCurrency}`
      );
      const ratesThreeDaysAgo = await responce.json();
      setLoading(false);
      setRatesThreeDaysAgo(ratesThreeDaysAgo.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchFourDaysAgo = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${fourDaysAgoFormatted}?symbols=${selectedCurrency}`
      );
      const ratesFourDaysAgo = await responce.json();
      setLoading(false);
      setRatesFourDaysAgo(ratesFourDaysAgo.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchFiveDaysAgo = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${fiveDaysAgoFormatted}?symbols=${selectedCurrency}`
      );
      const ratesFiveDaysAgo = await responce.json();
      setLoading(false);
      setRatesFiveDaysAgo(ratesFiveDaysAgo.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchSixDaysAgo = async () => {
    try {
      const responce = await fetch(
        `https://api.openrates.io/${sixDaysAgoFormatted}?symbols=${selectedCurrency}`
      );
      const ratesSixDaysAgo = await responce.json();
      setLoading(false);
      setRatesSixDaysAgo(ratesSixDaysAgo.rates[selectedCurrency]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchToday();
    fetchYesterday();
    fetchTwoDaysAgo();
    fetchThreeDaysAgo();
    fetchFourDaysAgo();
    fetchFiveDaysAgo();
    fetchSixDaysAgo();
  }, [selectedCurrency]);

  const Clicked = (key) => {
    setSelectedCurrency(key);
    calculateValue();
  };

  const listRatesItems = [];

  for (const [key, value] of Object.entries(listRates)) {
    listRatesItems.push(
      <button key={key} onClick={() => Clicked(key)}>
        {key} : {value}
      </button>
    );
  }

  const calculateValue = () => {
    const values = {
      [todayFormatted]: ratesToday,
      [oneDayAgoFormatted]: ratesYesterday,
      [twoDaysAgoFormatted]: ratesTwoDaysAgo,
      [threeDaysAgoFormatted]: ratesThreeDaysAgo,
      [fourDaysAgoFormatted]: ratesFourDaysAgo,
      [fiveDaysAgoFormatted]: ratesFiveDaysAgo,
      [sixDaysAgoFormatted]: ratesSixDaysAgo,
    };
    console.log(values);
  };

  // const maxValue = Math.max(...values);
  // const minValue = Math.min(...values);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <div className="container">
      <h1>Click to select a currency</h1>
      <CurrencyWrap>
        <div className="currencyButtons">{listRatesItems}</div>
        {selectedCurrency ? (
          <div>
            <Line
              data={{
                labels: [
                  sixDaysAgoFormatted,
                  fiveDaysAgoFormatted,
                  fourDaysAgoFormatted,
                  threeDaysAgoFormatted,
                  twoDaysAgoFormatted,
                  oneDayAgoFormatted,
                  todayFormatted,
                ],
                datasets: [
                  {
                    label: "Day Rate",
                    data: [
                      ratesToday,
                      ratesYesterday,
                      ratesTwoDaysAgo,
                      ratesThreeDaysAgo,
                      ratesFourDaysAgo,
                      ratesFiveDaysAgo,
                      ratesSixDaysAgo,
                    ],
                    backgroundColor: "transparent",
                    borderColor: "#b30000",
                    borderWidth: "1",
                  },
                ],
              }}
              height={200}
              width={200}
              options={{ maintainAspectRatio: false }}
            ></Line>
            <div className="buttons">
              {/* <button className="min">MINIMUM {minValue} </button>
              <button className="max">MAXIMUM {maxValue}</button> */}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Displaying the chart and the MIN MAX Values */}
      </CurrencyWrap>
    </div>
  );
};

export default CurrencyExchange;

// CSS with Styled Components

const CurrencyWrap = styled.div`
  text-align: center;
  margin: 10px;

  button {
    margin: 5px;
    background-color: #bfbfbf;
    border: none;
    padding: 10px;
    border-radius: 5px;
    min-width: 150px;
  }

  .buttons {
    margin-top: 30px;
  }

  .currencyButtons {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .min {
    background-color: #b30000;
    color: white;
    font-weight: bold;
  }

  .max {
    background-color: #006622;
    color: white;
    font-weight: bold;
  }

  button:focus {
    background-color: #b30000;
    color: white;
    border: none;
  }
  button > span {
    font-weight: bold;
  }
`;
