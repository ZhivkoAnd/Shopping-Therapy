import React from 'react';
import { useGlobalContext } from './Context';

const Child = () => {
    // Using the useGlobalContext hook to access the context value
    const { name } = useGlobalContext();
  
    return (
      <div>
        <h1>Hello, {name}!</h1>
      </div>
    );
  };
  
  export default Child;