import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  filterPriceAscending,
  filterPriceDescending,
  filterTitleAscending,
  filterTitleDescending,
} from "../utils/FilterFunctions";
import LoadingSpinners from "./ui/LoadingSpinners";
import ErrorUI from "./ui/ErrorUI";
import ActionBar from "./ui/ActionBar";
import AdminProductList from "./AdminProductList";
import CreateUpdateProduct from "../components/CreateUpdateProduct";
import { Link } from "react-router-dom";
import { deleteData } from "../utils/FetchQueryClient";
import { createData } from "../utils/FetchQueryClient";

const Admin = () => {
  const [inputQuery, setInputQuery] = useState("");

  const titleRef: any = useRef("");
  const priceRef: any = useRef("");
  const imageRef: any = useRef("");

  const queryClient = useQueryClient();

  const fetchBookingQuery = async () => {
    // We receive the response from the server
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/cities`);
    return response.json();
  };

  const { data, isLoading, isError } = useQuery(["shop"], fetchBookingQuery, {
    onSuccess(data) {
      setFilters(data);
    },
  });

  const { mutateAsync: deleteMutate, isLoading: isLoadingDeletedElement } =
    useMutation(deleteData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["shop"]);
      },
    });

  const remove = async (id: number) => {
    await deleteMutate(id);
  };

  const [filterss, setFilters] = useState(data);

  const { mutateAsync: createMutate } = useMutation(createData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["shop"]);
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
      setFilters(data);
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
      <Link to={"/"} />
      <AdminProductList
        data={filterss}
        remove={remove}
        isLoadingDeletedElement={isLoadingDeletedElement}
      />
      <h1>Add new vacation</h1>
      <CreateUpdateProduct
        handleSubmit={handleSubmit}
        titleRef={titleRef}
        priceRef={priceRef}
        imageRef={imageRef}
      />
    </>
  );
};

export default Admin;
