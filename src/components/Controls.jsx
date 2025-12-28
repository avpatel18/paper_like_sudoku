import React from 'react';

function Controls({ onUndo, onErase, onToggleNotes, notesMode }) {
    return (
        <div className="controls">
            <button className="control-btn" onClick={onUndo}>
                <span className="icon">↩️</span>
                <span>Undo</span>
            </button>
            <button className="control-btn" onClick={onErase}>
                <span className="icon">⌫</span>
                <span>Erase</span>
            </button>
            <button className={`control-btn ${notesMode ? 'active' : ''}`} onClick={onToggleNotes} style={{ position: 'relative' }}>
                {/* Show 'ON' badge if notes mode active */}
                {notesMode && <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.6rem', background: '#2c2c2c', color: '#fff', padding: '1px 3px', borderRadius: '4px' }}>ON</span>}
                <span className="icon">✎</span>
                <span>Notes</span>
            </button>
            <button className="control-btn">
                <span className="icon">💡</span>
                <span>Hint</span>
            </button>
        </div>
    );
}

export default Controls;
