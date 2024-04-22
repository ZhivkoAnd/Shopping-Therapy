import { useState, useEffect } from 'react';

const SearchSynonyms = () => {
  const [input, setInput] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [results, setResults] = useState<[] | undefined>();

  useEffect(() => {
    (async () => {
      const fetchWords = await fetch(`https://api.datamuse.com/words?ml=${searchWord}`);
      const fetchedWords = await fetchWords.json();
      setResults(fetchedWords);
    })();
  }, [searchWord]);

  // When we want to see their type, we can use the hover, but we remove the 'handler' from the type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchWord(input);
    setInput('');
  };

  const reset = () => {
    setSearchWord('')
    setInput('')
  }
  
  return (
    <>
      <div>
        <div>Submit a word to get synonyms</div><br/>
        <form onSubmit={onSubmit}>
          <input type="text" value={input} onChange={(e) => handleChange(e)} /><br /><br/>
          <div> <button type="submit">Submit</button></div>
        </form><br/>
        <button type="submit" onClick={reset}>Reset</button>
        <div>
          {results?.map((e: { word: string }) => {
            return <div key={e.word}>{e.word}</div>;
          })}
        </div>
       
      </div>
    </>
  );
};

export default SearchSynonyms;



// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import {useState, useEffect, useRef} from 'react'

// const Testing = () => {

// const [input, setInput] = useState('')


// const fetchingQuery = async (searchWord: string) => {
//   const synonyms = await fetch(`https://api.datamuse.com/words?ml=${searchWord}`)
//   const results = await synonyms.json()
//   return results
// }


// // Query is not resetting when the form is submitted, and as a result, you don't get new results.
// // To address this, you can use the refetch function provided by react-query to manually refetch the data when the form is submitted.
// // The refetch function is obtained from the useQuery hook, and it is called when the form is submitted.
// // Additionally, the enabled option is set to false to prevent the query from automatically fetching data when the component mounts. This allows you to control when the query is executed manually.
// const {data: words, refetch} = useQuery(['words', input], ()=> fetchingQuery(input), {
//   enabled: false, // Disable automatic query execution
// })

// const submit = (e: any) => {
//   e.preventDefault()
//   console.log(input)
//   refetch(); // Manually refetch the data when the form is submitted
// }

// return (
// <>
// <form onSubmit={submit}>
// <input value={input} onChange={(e)=> setInput(e.target.value)}/>
// <button type='submit'>Submit</button>
// </form>
// <div>
//   {words?.map((e: any)=> <div>{e.word}</div>)}
// </div>
// </>
// )

// }

// export default Testing