import React from 'react';

function Cell({ rowIndex, colIndex, data, isSelected, onClick }) {
    const { value, isFixed, notes, isError } = data;

    const classes = [
        'cell',
        isSelected ? 'selected' : '',
        isFixed ? 'fixed' : 'editable',
        isError ? 'error' : '',
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {value !== 0 ? (
                value
            ) : (
                <div className="notes-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <div key={n} className="note-num">
                            {notes.includes(n) ? n : ''}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cell;
