import React from 'react';

const NumberPad = ({ onNumberInput }) => {
  return (
    <div className="number-pad no-select">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button 
          key={num} 
          className="num-btn"
          onClick={() => onNumberInput(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
