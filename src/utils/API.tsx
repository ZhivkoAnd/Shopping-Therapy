import { createClient } from "contentful";
import { useQuery } from "@tanstack/react-query";

//Contentful
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

// Products

// Delete Data

export const deleteData = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error();
  }
  return true;
};

// Create Data

export const createData = async (data: {}) => {
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Update Data

export const updateData = async ({ id, ...data }: any) => {
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Get Data

export const getProduct = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities/${id}`);
  return response.json();
};

// Get all Books

export const fetchBookingQuery = async () => {
  // We receive the response from the server
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
  return response.json();
};
