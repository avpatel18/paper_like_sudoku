import React from 'react';
import { Undo2, Eraser, Pencil, Lightbulb } from 'lucide-react';

const Tools = ({ onUndo, onErase, onHint, pencilMode, onTogglePencil, canUndo, hintsUsed }) => {
  const remainingHints = 3 - (hintsUsed || 0);

  return (
    <div className="tools-row no-select">
      {/* ... previous buttons ... */}
      <button 
        className={`tool-btn ${canUndo ? '' : 'disabled'}`} 
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo2 size={28} />
        <span>Undo</span>
      </button>
      
      <button className="tool-btn" onClick={onErase}>
        <Eraser size={28} />
        <span>Erase</span>
      </button>
      
      <button 
        className={`tool-btn ${pencilMode ? 'active' : ''}`} 
        onClick={onTogglePencil}
      >
        <div style={{ position: 'relative' }}>
          <Pencil size={28} />
          {pencilMode && (
            <div style={{ 
              position: 'absolute', 
              top: -5, right: -5, 
              padding: '2px 6px', 
              background: 'var(--primary)', 
              color: 'white', 
              fontSize: '10px', 
              borderRadius: '8px', 
              fontWeight: '700' 
            }}>ON</div>
          )}
        </div>
        <span>Pencil</span>
      </button>
      
      <button 
        className={`tool-btn ${remainingHints <= 0 ? 'disabled' : ''}`} 
        onClick={onHint}
        disabled={remainingHints <= 0}
      >
        <div style={{ position: 'relative' }}>
          <Lightbulb size={28} />
          {remainingHints > 0 && (
            <div style={{ 
              position: 'absolute', 
              top: -5, right: -5, 
              width: '18px',
              height: '18px',
              background: 'var(--primary)', 
              color: 'white', 
              fontSize: '11px', 
              borderRadius: '50%', 
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>{remainingHints}</div>
          )}
        </div>
        <span>Hint</span>
      </button>
    </div>
  );
};

export default Tools;
