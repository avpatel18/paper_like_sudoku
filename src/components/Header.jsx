import React from 'react';

// Helpers to format time
const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
};

function Header({ difficulty, timer, mistakes, status }) {
    return (
        <div className="header">
            <div className="top-bar">
                <div className="level-indicator">{difficulty}</div>
                <div className="stats-bar">
                    <span>Mistakes: {mistakes}/3</span>
                </div>
                <div className="timer">{formatTime(timer)}</div>
            </div>
            {/* 
        The request asked for:
        "utmost layer, from left to right order, back button, smart counter of statistics, pause button and setting button."
        Wait, the request said: 
        "on top of that actualy sudoku panel, on top of that, on left side display the level of sudoku, on the right side display timer, and on top of that, utmost layer, from left to right order, back button, smart counter of statistics, pause button and setting button."
        
        So:
        Row 1 (Topmost): Back, Stats, Pause, Settings
        Row 2 (Below): Level (Left), Timer (Right)
        Row 3: Board
        
        Refactoring header to match this.
      */}
            <div className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <button className="control-btn"><span className="icon">←</span></button>
                <div className="smart-stats">Stats</div>
                <button className="control-btn"><span className="icon">⏸</span></button>
                <button className="control-btn"><span className="icon">⚙️</span></button>
            </div>

        </div>
    );
}

export default Header;
