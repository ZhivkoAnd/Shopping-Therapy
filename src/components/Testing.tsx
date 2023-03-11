import React, { useEffect, useState } from "react";

// The function you create inside component function is a closure that captures the values at the moment it's created.
// When that function runs, all variables it has access to are from the moment its created and not after the component re-renders, which create the closure again with new values for the variables.

const Testing = () => {
  const [count, setCount] = useState(0);

  // Solution 1
  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    fetch(`http://127.0.0.1:5173/${newCount}`);
  };

  // Solution 2

  //   const handleClick = () => {
  //     setCount((e) => e + 1);
  //   };

  //   useEffect(() => {
  //     fetch(`http://127.0.0.1:5173/${count}`);
  //   }, [count]);

  //Solution 3 - bad

  //   const handleClick = () => {
  //     const newCount = count + 1;
  //     setCount((e) => {
  //       fetch(`http://127.0.0.1:5173/${newCount}`);
  //       return e + 1;
  //     });
  //   };

  return <button onClick={handleClick}>{count}</button>;
};

export default Testing;
