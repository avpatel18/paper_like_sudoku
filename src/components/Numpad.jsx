import React from 'react';

function Numpad({ onInput }) {
    return (
        <div className="numpad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button key={num} className="num-btn" onClick={() => onInput(num)}>
                    {num}
                </button>
            ))}
        </div>
    );
}

export default Numpad;
