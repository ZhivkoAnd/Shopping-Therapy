import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  filterPriceAscending,
  filterPriceDescending,
  filterTitleAscending,
  filterTitleDescending,
} from "../utils/FilterFunctions";
import LoadingSpinners from "../components/ui/LoadingSpinners";
import ErrorUI from "../components/ui/ErrorUI";
import ActionBar from "../components/ui/ActionBar";
import AdminProductList from "./AdminProductList";

const Shop = () => {

  const [inputQuery, setInputQuery] = useState("");

  const titleRef: any = useRef("");
  const priceRef: any = useRef("");
  const imageRef: any = useRef("");

  const queryClient = useQueryClient();

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

  const createData = async (data: {}) => {
    const response = await fetch("http://localhost:4000/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const deleteData = async (id: number) => {
    const response = await fetch(`http://localhost:4000/cities/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error();
    }
    return true;
  };

  const { mutateAsync: deleteMutate, isLoading: isLoadingDeletedElement } =
    useMutation(deleteData, {
      onSettled: (data) => {
        queryClient.invalidateQueries(["bookings"]);
      },
    });

  const remove = async (id: number) => {
    await deleteMutate(id);
  };

  const [filterss, setFilters] = useState(data);

  const { mutateAsync: createMutate } = useMutation(createData, {
    onSettled: (data) => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createMutate({
      title: titleRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
    });
  };

  const inputData = data?.filter((city: any) =>
    city.title.toLowerCase().includes(inputQuery.toLowerCase())
  );

  const setFilterPriceAscending = () => {
    if (inputData && inputData.length) {
      setFilters(filterPriceAscending(inputData));
    }
  };

  const setFilterPriceDescending = () => {
    if (inputData && inputData.length) {
      setFilters(filterPriceDescending(inputData));
    }
  };

  const setFilterTitleAscending = () => {
    if (inputData && inputData.length) {
      setFilters(filterTitleAscending(inputData));
    }
  };

  const setFilterTitleDescending = () => {
    if (inputData && inputData.length) {
      setFilters(filterTitleDescending(inputData));
    }
  };

  useEffect(() => {
    if (inputData && inputData.length) {
      setFilters(inputData);
    } else {
      setFilters([]);
    }
  }, [inputQuery]);

  if (isLoading) {
    return <LoadingSpinners magnifying_glass />;
  }

  if (isError) {
    return <ErrorUI />;
  }

  return (
    <>
     <ActionBar
        inputQuery={inputQuery}
        setInputQuery={setInputQuery}
        setFilterPriceAscending={setFilterPriceAscending}
        setFilterPriceDescending={setFilterPriceDescending}
        setFilterTitleAscending={setFilterTitleAscending}
        setFilterTitleDescending={setFilterTitleDescending}
        isAdminPage
      />
        <AdminProductList
        data={filterss}
        remove={remove}
        isLoadingDeletedElement={isLoadingDeletedElement}
      />
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
    </>
  );
};

export default Shop;
