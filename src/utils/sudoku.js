export const BLANK = 0;

export function generateSudoku(difficulty = 'medium') {
  // Simple generator: fill diagonal boxes, solve, then remove digits
  const board = Array.from({ length: 9 }, () => Array(9).fill(BLANK));

  // Fill diagonal 3x3 boxes (independent)
  for (let i = 0; i < 9; i += 3) {
    fillBox(board, i, i);
  }

  // Solve the rest
  solveSudoku(board);

  // Remove digits based on difficulty
  const attempts = difficulty === 'hard' ? 50 : difficulty === 'medium' ? 40 : 30;
  removeDigits(board, attempts);

  // Create initial state structure
  // value: number | 0, isFixed: boolean, notes: number[]
  const initialBoard = board.map(row => 
    row.map(val => ({
      value: val,
      isFixed: val !== BLANK,
      notes: [],
      isError: false
    }))
  );

  return initialBoard;
}

function fillBox(board, row, col) {
  let num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isSafeBox(board, row, col, num));
      board[row + i][col + j] = num;
    }
  }
}

function isSafeBox(board, rowStart, colStart, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowStart + i][colStart + j] === num) return false;
    }
  }
  return true;
}

function isSafe(board, row, col, num) {
  for (let k = 0; k < 9; k++) {
    if (board[row][k] === num) return false;
    if (board[k][col] === num) return false;
  }
  const boxRow = row - row % 3;
  const boxCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === BLANK) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = BLANK;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function removeDigits(board, count) {
  while (count > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    if (board[row][col] !== BLANK) {
      board[row][col] = BLANK;
      count--;
    }
  }
}

export function isValidMove(board, row, col, num) {
    if (!num) return true; 
    // Check row, col, box for conflicts
    // Note: board here is the object structure { value: ... }
    
    // Check Row
    for (let c = 0; c < 9; c++) {
        if (c !== col && board[row][c].value === num) return false;
    }
    // Check Col
    for (let r = 0; r < 9; r++) {
        if (r !== row && board[r][col].value === num) return false;
    }
    // Check Box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if ((startRow + r !== row || startCol + c !== col) && 
                board[startRow + r][startCol + c].value === num) {
                return false;
            }
        }
    }
    return true;
}
