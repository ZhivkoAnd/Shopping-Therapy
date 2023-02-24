import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = async ({ queryKey }: any) => {
    const [_key, { id }] = queryKey;
    const response = await fetch(
      `${import.meta.env.VITE_API_KEY}/cities/${id}`
    );
    return response.json();
  };

  const { data, error, isLoading, isError } = useQuery(
    ["product", { id }],
    getProduct
  );

  if (isLoading) {
    return <div>Loading update :</div>;
  }

  if (isError) {
    return <div>wtf</div>;
  }
  return null;
};

export default ProductItem;
