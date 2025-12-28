import { useState, useEffect, useCallback, useReducer } from 'react';
import { generateSudoku, isValidMove, BLANK } from '../utils/sudoku';

const ACTIONS = {
    NEW_GAME: 'NEW_GAME',
    SELECT_CELL: 'SELECT_CELL',
    INPUT_NUMBER: 'INPUT_NUMBER',
    TOGGLE_NOTES_MODE: 'TOGGLE_NOTES_MODE',
    UNDO: 'UNDO',
    ERASE: 'ERASE',
    HINT: 'HINT',
    PAUSE_GAME: 'PAUSE_GAME',
    RESUME_GAME: 'RESUME_GAME',
};

const initialState = {
    board: [],
    selectedCell: null, // { row, col }
    history: [],
    notesMode: false,
    mistakes: 0,
    hintsUsed: 0,
    status: 'idle', // idle, playing, paused, won, lost
    difficulty: 'medium',
    startTime: null,
    elapsedTime: 0, // in seconds
};

function sudokuReducer(state, action) {
    switch (action.type) {
        case ACTIONS.NEW_GAME:
            return {
                ...initialState,
                board: generateSudoku(action.difficulty),
                status: 'playing',
                difficulty: action.difficulty,
                startTime: Date.now(),
            };

        case ACTIONS.SELECT_CELL:
            return { ...state, selectedCell: action.payload };

        case ACTIONS.TOGGLE_NOTES_MODE:
            return { ...state, notesMode: !state.notesMode };

        case ACTIONS.INPUT_NUMBER: {
            if (state.status !== 'playing' || !state.selectedCell) return state;
            const { row, col } = state.selectedCell;
            const cell = state.board[row][col];
            const number = action.payload;

            if (cell.isFixed) return state;

            const newBoard = JSON.parse(JSON.stringify(state.board));

            if (state.notesMode) {
                // Toggle note
                const notes = newBoard[row][col].notes;
                if (notes.includes(number)) {
                    newBoard[row][col].notes = notes.filter(n => n !== number);
                } else {
                    newBoard[row][col].notes = [...notes, number].sort();
                }
                // Notes don't add to history in this simple version, or maybe they should?
                // For simplicity, let's say they don't count as a "move" for undo unless requested.
                return {
                    ...state,
                    board: newBoard,
                };
            } else {
                // Normal input
                if (cell.value === number) return state; // No change

                // Validation for mistakes
                const isCorrect = isValidMove(state.board, row, col, number);
                // Note: isValidMove checks current board state errors. 
                // Real Sudoku usually checks against the SOLUTION. 
                // But for our generator, we don't store the solution explicitly locally unless we solve it.
                // The generator returns a solvable board but not the solution.
                // We can either generating the solution along with the puzzle or just check consistency.
                // checking consistency:

                const valid = isValidMove(state.board, row, col, number);

                newBoard[row][col].value = number;
                newBoard[row][col].isError = !valid;
                newBoard[row][col].notes = []; // Clear notes if number placed

                // History
                const newHistory = [...state.history, {
                    board: JSON.parse(JSON.stringify(state.board)),
                    mistakes: state.mistakes
                }];

                let newMistakes = state.mistakes;
                if (!valid) newMistakes++;

                // Check win condition
                let isWon = false;
                if (valid) {
                    // check if full
                    let isFull = true;
                    for (let r = 0; r < 9; r++) {
                        for (let c = 0; c < 9; c++) {
                            if (newBoard[r][c].value === BLANK || newBoard[r][c].isError) {
                                isFull = false;
                                break;
                            }
                        }
                    }
                    if (isFull) isWon = true;
                }

                return {
                    ...state,
                    board: newBoard,
                    history: newHistory,
                    mistakes: newMistakes,
                    status: isWon ? 'won' : 'playing',
                };
            }
        }

        case ACTIONS.UNDO: {
            if (state.history.length === 0) return state;
            const previousState = state.history[state.history.length - 1];
            return {
                ...state,
                board: previousState.board,
                mistakes: previousState.mistakes,
                history: state.history.slice(0, -1),
            };
        }

        case ACTIONS.ERASE: {
            if (state.status !== 'playing' || !state.selectedCell) return state;
            const { row, col } = state.selectedCell;
            if (state.board[row][col].isFixed) return state;

            const newBoard = JSON.parse(JSON.stringify(state.board));
            newBoard[row][col].value = BLANK;
            newBoard[row][col].notes = [];
            newBoard[row][col].isError = false;

            const newHistory = [...state.history, {
                board: JSON.parse(JSON.stringify(state.board)),
                mistakes: state.mistakes
            }];

            return {
                ...state,
                board: newBoard,
                history: newHistory
            };
        }

        // Add timer logic handling in hook, reducer just updates state? 
        // Usually timer is side effect.
        // We'll leave timer state management to the hook mostly, but 'elapsedTime' could be here.

        default:
            return state;
    }
}

export function useSudoku() {
    const [state, dispatch] = useReducer(sudokuReducer, initialState);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (state.status === 'playing') {
            interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [state.status]);

    const newGame = (difficulty) => {
        setTimer(0);
        dispatch({ type: ACTIONS.NEW_GAME, difficulty });
    };

    const selectCell = (row, col) => dispatch({ type: ACTIONS.SELECT_CELL, payload: { row, col } });
    const inputNumber = (num) => dispatch({ type: ACTIONS.INPUT_NUMBER, payload: num });
    const toggleNotes = () => dispatch({ type: ACTIONS.TOGGLE_NOTES_MODE });
    const undo = () => dispatch({ type: ACTIONS.UNDO });
    const erase = () => dispatch({ type: ACTIONS.ERASE });

    return {
        ...state,
        timer,
        newGame,
        selectCell,
        inputNumber,
        toggleNotes,
        undo,
        erase
    };
}
