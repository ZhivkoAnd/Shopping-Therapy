import React, { useState } from 'react';

const Testing = () => {
  const [grid, setGrid] = useState(Array(9).fill('')); // Initialize grid with 9 empty cells
  const [player1, setPlayer1] = useState('X'); // Initialize player1 with 'X'
  const [player2, setPlayer2] = useState('O'); // Initialize player2 with 'O'
  const [winner, setWinner] = useState(null); // State to track the winner

  const checkWinner = (grid: any[]) => {
    // Define winning combinations
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Check each winning combination
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        // If the symbols in the winning combination are the same, return the winning symbol
        return grid[a];
      }
    }

    // If no winner is found, return null
    return null;
  };

  const markMe = (index: number) => {
    // If the cell is already marked or there's a winner, return early
    if (grid[index] || winner) {
      return;
    }

    // Create a copy of the current grid array
    const newGrid = [...grid];
    // Set the value of the clicked index based on the current player
    newGrid[index] = player1;

    // Check for a winner
    const newWinner = checkWinner(newGrid);
    if (newWinner) {
      setWinner(newWinner); // Set the winner
    } else {
      // Toggle between player1 and player2
      setPlayer1(player1 === 'X' ? 'O' : 'X');
      setPlayer2(player2 === 'X' ? 'O' : 'X');
    }

    // Update the grid state with the modified array
    setGrid(newGrid);
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
        {grid.map((value, index) => (
          <button
            key={index}
            style={{ width: '50px', height: '50px', background: value === 'X' ? 'red' : value === 'O' ? 'green' : 'white' }}
            onClick={() => markMe(index)}
            disabled={value || winner} // Disable button if cell is already marked or there's a winner
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <div>Winner: {winner}</div>}
    </>
  );
};

export default Testing;