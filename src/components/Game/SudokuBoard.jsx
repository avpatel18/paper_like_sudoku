import React from 'react';
import { motion } from 'framer-motion';

const SudokuBoard = ({ board, initialBoard, selectedCell, onCellClick, solution, notes, difficulty }) => {
  const getCellClasses = (r, c) => {
    let classes = 'sudoku-cell';
    const isSelected = selectedCell?.r === r && selectedCell?.c === c;
    const isInitial = initialBoard[r][c] !== null;
    const val = board[r][c];
    
    if (isInitial) classes += ' initial';
    else if (val !== null) classes += ' user-input';

    if (isSelected) classes += ' selected';
    else if (selectedCell && difficulty !== 'hard' && difficulty !== 'expert') {
      // Highlight related cells (same row, col, or box) - disabled for hard and expert
      const isSameRow = selectedCell.r === r;
      const isSameCol = selectedCell.c === c;
      const isSameBox = Math.floor(selectedCell.r / 3) === Math.floor(r / 3) && 
                       Math.floor(selectedCell.c / 3) === Math.floor(c / 3);
      if (isSameRow || isSameCol || isSameBox) classes += ' related';
      
      // Highlight same numbers - disabled for hard and expert
      const selectedVal = board[selectedCell.r][selectedCell.c];
      if (selectedVal !== null && val === selectedVal) classes += ' same-num';
    }

    // Check for errors (only for user input)
    if (!isInitial && val !== null && val !== solution[r][c]) {
      classes += ' error';
    }

    return classes;
  };

  return (
    <div className="sudoku-grid no-select">
      {board.map((row, r) => 
        row.map((cell, c) => (
          <motion.div 
            key={`${r}-${c}`} 
            initial={false}
            animate={{ 
              scale: (selectedCell?.r === r && selectedCell?.c === c) ? 1.05 : 1,
              zIndex: (selectedCell?.r === r && selectedCell?.c === c) ? 10 : 1
            }}
            className={getCellClasses(r, c)}
            onClick={() => onCellClick(r, c)}
          >
            {cell !== null ? (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={cell}
              >
                {cell}
              </motion.span>
            ) : (
              <div className="cell-notes">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <div key={num} className="note-digit">
                    {(notes[r]?.[c] || []).includes(num) ? num : ''}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
};

export default SudokuBoard;
