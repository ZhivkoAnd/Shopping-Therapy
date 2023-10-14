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