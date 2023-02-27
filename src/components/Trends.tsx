import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFruitsQuery } from "../utils/API";

const Trends = () => {
  const { data, isLoading, isError } = useQuery(["fruits"], fetchFruitsQuery);

  const [shown, setShown] = useState("");

  console.log(data);

  const click = (id: any) => {
    setShown(id);
  };

  console.log(shown);

  return (
    <>
      <div>
        {data?.filter((e: any) => e.id === shown).map((e: any) => e.title)}
      </div>
      <div>
        {data?.map((e: any) => (
          <button onClick={() => click(e.id)}>{e.title}</button>
        ))}
      </div>
    </>
  );
};

export default Trends;
