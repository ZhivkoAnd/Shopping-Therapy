
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const Testing = () => {
    const [newPage, setNewPage] = useState(1);
    const queryClient = useQueryClient();
  
    const fetchUsers = async () => {
      const users = await fetch("https://randomuser.me/api/");
      return users.json();
    };
  
    const { data } = useQuery(["users"], fetchUsers);
  
    const fetchNewPage = async (page: number) => {
      const pages = await fetch(`https://randomuser.me/api?page=${page}`);
      return pages.json();
    };
  
    const { data: newUser } = useQuery(["users", newPage], () =>
      fetchNewPage(newPage)
    );
  
    const addUserToList = () => {
      setNewPage(page => page + 1)
      if (newUser) {
        queryClient.setQueryData(["users"], (prev: any) => ({
          ...prev,
          results: [...prev.results, newUser.results[0]]
        }));
      }
    };
  
    return (
      <>
        <div>
          {data?.results?.map((e: { name: { first: string } }) => {
            return <div key={e.name.first}>{e.name.first}</div>;
          })}
        </div>
        <div>
          <button onClick={addUserToList}>Add User to List</button>
        </div>
      </>
    );
  };
  
  export default Testing;