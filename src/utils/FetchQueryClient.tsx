"use client";

import { createClient } from "contentful";
import { useQuery } from "@tanstack/react-query";

const fetchQuery = async () => {
  const client = createClient({
    space: "6yu8mnoa9wdc",
    accessToken: "qSxY7HTMgBYn3WQP4bL5svs27iUAQZEM-rauSvhvixg",
  });

  const responce = await client.getEntries({ content_type: "recipe" });
  return responce;
};

export const FetchVacationsClient = () => {
  return useQuery(["vacations"], fetchQuery);
};

const fetchBookingQuery = async () => {
  const response = await fetch("http://localhost:4000/");
  return response.json();
};

export const FetchBookings = () => {
  return useQuery(["bookings"], fetchBookingQuery);
};
