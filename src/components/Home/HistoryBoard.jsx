import React from 'react';

const HistoryBoard = ({ board, initialBoard, solution }) => {
  const getCellClasses = (r, c) => {
    let classes = 'sudoku-cell';
    const isInitial = initialBoard[r][c] !== null;
    const val = board[r][c];
    
    if (isInitial) classes += ' initial';
    else if (val !== null) classes += ' user-input';

    // Show errors in red if the game was failed or just for accuracy
    if (!isInitial && val !== null && val !== solution[r][c]) {
      classes += ' error';
    }

    return classes;
  };

  return (
    <div className="sudoku-grid no-select" style={{ maxWidth: '300px', margin: '0 auto' }}>
      {board.map((row, r) => 
        row.map((cell, c) => (
          <div 
            key={`${r}-${c}`} 
            className={getCellClasses(r, c)}
            style={{ fontSize: '1rem' }}
          >
            {cell !== null ? cell : ''}
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryBoard;
