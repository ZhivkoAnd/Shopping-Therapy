import React, { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Shop = () => {
  const titleRef: any = useRef("");
  const priceRef: any = useRef("");
  const imageRef: any = useRef("");

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

  return (
    <form className="container">
      <div className="form-group">
        <label>Title</label>
        <input ref={titleRef} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input ref={priceRef} type="number" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Image</label>
        <input ref={imageRef} className="form-control"></input>
      </div>
      <button type="submit">Add vacation</button>
    </form>
  );
};

export default Shop;
