import {useState} from 'react'

 type PairsType = {
    [key: string]: string;
  }
  
const GuessGame = () => {

  const pairs : PairsType = {
    Bulgaria: 'Sofia',
    Denmark: 'Copenhagen',
    Sweden: 'Stockholm',
    Romania: 'Bucharest'
  };

  const countries = Object.keys(pairs);
  const cities = Object.values(pairs);
  //  const [options, setOptions] = useState(Object.entries(pairs).flat().sort(() => Math.random() - 0.5));

  
  const [options, setOptions] = useState([...countries, ...cities].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState<string | null>(null);
  
  const checkMe =  (option: string) => {
    // If an option is already selected
    if (selected) {
      // Check if the selected option corresponds to the clicked option
      // Case 1 - if the already selected country's city is the same as the clicked one ex - "pairs[Bulgaria] === Sofia"
      // Case 2 - if the already selected city corresponds to the clicked country's city - "Sofia === pairs[Bulgaria]"
      // We cannot have only one option because we don't know which one the user will click first
      if (pairs[selected] === option || selected === pairs[option]) {
        // Remove both the selected option and the clicked option
        setOptions((options) => options.filter((opt) => opt !== selected && opt !== option));
        setSelected(null); // Reset the selected option
      }
    } else {
      // If no option is selected, select the current option
      setSelected(option);
    }
  };
  
  if (options. length === 0) {
    return <div>No options left</div>
  }

  return (
    <>
    <div>
      Match a country with it's capital or vice versa until there is no more pairs left !
    </div><br/>
      <div>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => checkMe(option)}
            style={option === selected ? { background: 'blue' } : {}}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
  };
  
  export default GuessGame;