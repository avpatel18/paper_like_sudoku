import React from 'react';
import Cell from './Cell';

function SudokuBoard({ board, selectedCell, onSelectCell }) {
    if (!board || board.length === 0) return null;

    return (
        <div className="sudoku-board">
            {board.map((row, rowIndex) => (
                row.map((cellData, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        data={cellData}
                        isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                        onClick={() => onSelectCell(rowIndex, colIndex)}
                    />
                ))
            ))}
        </div>
    );
}

export default SudokuBoard;
