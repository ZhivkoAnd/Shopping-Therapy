import React, {useState} from 'react'

const elements = [
    'Ac', 'Al', 'Am', 'Sb', 'Ar', 'As', 'At', 'Ba', 'Bk', 'Be', 'Bi', 'Bh', 'B', 'Br', 'Cd', 'Ca', 'Cf', 'C', 'Ce',
    'Cs', 'Cl', 'Cr', 'Co', 'Cn', 'Cu', 'Cm', 'Ds', 'Db', 'Dy', 'Es', 'Er', 'Eu', 'Fm', 'Fl', 'F', 'Fr', 'Gd', 'Ga',
    'Ge', 'Au', 'Hf', 'Hs', 'He', 'Ho', 'H', 'In', 'I', 'Ir', 'Fe', 'Kr', 'La', 'Lr', 'Pb', 'Li', 'Lv', 'Lu', 'Mg',
    'Mn', 'Mt', 'Md', 'Hg', 'Mo', 'Mc', 'Nd', 'Ne', 'Np', 'Ni', 'Nh', 'Nb', 'N', 'No', 'Og', 'Os', 'O', 'Pd', 'P', 'Pt',
    'Pu', 'Po', 'K', 'Pr', 'Pm', 'Pa', 'Ra', 'Rn', 'Re', 'Rh', 'Rg', 'Rb', 'Ru', 'Rf', 'Sm', 'Sc', 'Sg', 'Se', 'Si',
    'Ag', 'Na', 'Sr', 'S', 'Ta', 'Tc', 'Te', 'Ts', 'Tb', 'Tl', 'Th', 'Tm', 'Sn', 'Ti', 'W', 'U', 'V', 'Xe', 'Yb', 'Y',
    'Zn', 'Zr',
  ]

const BBstyle = {
  background: 'green',
  fontSize: '3rem',
  letterSpacing: '0.1rem',
}

const DefaultStyle = {
  fontSize: '2.5rem',
  letterSpacing: '0.1rem'
}

function RandomUsers() {

 const [input, setInput] = useState("")

 const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
 }

const renderWord = () => {
  let array = []
  const firstTwoChars = input.slice(0,2)
  const firstChar = input.slice(0,1)
  for (let i = 0; i < input.length; i++) {
    array.push(<span style={(i < 2 && elements.includes(firstTwoChars) || (i < 1 && elements.includes(firstChar))) ? {...BBstyle} : {...DefaultStyle}}>{input[i]}</span>)
  }
 return array
};

// When we have an array of JSX elements, like we do now, we don't need to map over it, React will do that

return (
 <>
 <div>Breakify: </div><br/>
  <input onChange={(e)=>handleChange(e)}/><br/><br/>
  <div>{renderWord()}</div>
 </>
)
}

export default RandomUsers

