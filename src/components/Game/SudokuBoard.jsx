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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
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
