import { createClient } from "contentful";
import { useQuery } from "@tanstack/react-query";

// Contentful React Query
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

// Get all Data
export const fetchBookingQuery = async () => {
  // We receive the response from the server
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
  return response.json();
};

// Get Specific Data
export const getProduct = async ({ queryKey }: any) => {
  // The queryKey is an array, so we have to destructure it
  // The _key is the "product", but we don't need that, we only need the id
  const [_key, { id }] = queryKey;
  const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities/${id}`);
  return response.json();
};

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
    // JSON.stringify() method converts the JavaScript object to a string with JSON format. This is because servers typically expect data to be sent in a certain format, such as JSON or XML, and JSON.stringify() helps to ensure that the data is sent in the correct format.
    // {title: '123', price: '123', image: '123'} => {"title":"123","price":"123","image":"123"}
    body: JSON.stringify(data),
  });
  console.log(data);
  console.log(JSON.stringify(data));
  return response.json();
};

// Update Data

// As parameters we use id and data with spread operator but we can also use {data} and then data.id in the query string.
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
