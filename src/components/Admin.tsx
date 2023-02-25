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
import CreateProductModal from "./ui/CreateProductModal";
import { deleteData } from "../utils/API";
import { fetchBookingQuery } from "../utils/API";

const Admin = () => {
  const [inputQuery, setInputQuery] = useState("");

  const queryClient = useQueryClient();

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
      <CreateProductModal />
      <AdminProductList
        data={filterss}
        remove={remove}
        isLoadingDeletedElement={isLoadingDeletedElement}
      />
    </>
  );
};

export default Admin;
