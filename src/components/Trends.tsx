import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Trends = () => {


  const queryClient = useQueryClient();

// Get all Fruits

const categories = ["ditto", "bulbasaur", "venusaur", "charmander"];

const fetchFruitsQuery = async (pokemon: any) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return response.json();
};

const [pokemon, setPokemon] = useState<any>("")

  const { data, isLoading, isError } = useQuery(["pokemons", pokemon ], ()=> fetchFruitsQuery(pokemon));

  console.log(data)

 if (isLoading ) {
  return <div>Loading...</div>
 }

 console.log(pokemon)

  return (
    <>
     {pokemon}
      <div>
        {categories.map((e)=> <button onClick={() =>setPokemon(e)}>{e}</button>)}
        {!pokemon && data?.results?.map((e:any ) => e.name)}
       
      </div>
    </>
  );
};

export default Trends;
