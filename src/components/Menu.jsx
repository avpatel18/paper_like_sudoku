import React from 'react';
import '../styles/index.css'; // Ensure we have styles

function Menu({ onStart }) {
    return (
        <div className="menu-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
            <h1>Paper Like Sudoku</h1>
            <div className="menu-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="menu-btn" onClick={() => onStart('easy')} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>Easy</button>
                <button className="menu-btn" onClick={() => onStart('medium')} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>Medium</button>
                <button className="menu-btn" onClick={() => onStart('hard')} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>Hard</button>
            </div>
        </div>
    );
}

export default Menu;
