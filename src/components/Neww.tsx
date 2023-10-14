import {useState, useEffect} from 'react'

const Neww = () => {

  const pairs = {
    Bulgaria: 'Sofia',
    Denmark: 'Copenhagen',
    Sweden: 'Stockholm',
    Romania: 'Bucharest'
  };

  console.log(pairs['Bulgaria'])

  return (
    <>
    <div>
      Match a country with it's capital or vice versa until there is no more pairs left !
    </div>
    </>
  );
  };
  
  export default Neww;