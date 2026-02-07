import { getSudoku } from 'sudoku-gen';

export const generateSudoku = (difficulty = 'medium') => {
  const sudoku = getSudoku(difficulty);
  
  // Convert string format to 2D array
  const puzzle = [];
  const solution = [];
  
  for (let i = 0; i < 9; i++) {
    puzzle.push(sudoku.puzzle.slice(i * 9, (i + 1) * 9).split('').map(c => c === '-' ? null : parseInt(c)));
    solution.push(sudoku.solution.slice(i * 9, (i + 1) * 9).split('').map(c => parseInt(c)));
  }
  
  return {
    initialBoard: puzzle.map(row => [...row]),
    currentBoard: puzzle.map(row => [...row]),
    solution,
    initialBoardFlattened: sudoku.puzzle
  };
};

export const isValidMove = (board, row, col, val) => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === val) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === val) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === val) return false;
    }
  }
  
  return true;
};
