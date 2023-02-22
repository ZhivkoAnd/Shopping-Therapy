import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Shop = () => {
  const fetchBookingQuery = async () => {
    // We receive the response from the server
    const response = await fetch("http://localhost:4000/cities");
    return response.json();
  };

  const { data, isLoading, isError } = useQuery(["shop"], fetchBookingQuery, {
    onSuccess(data) {
      console.log(data);
    },
  });

  return <div>Shop</div>;
};

export default Shop;
