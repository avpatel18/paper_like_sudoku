import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Frown, RotateCcw, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

const ResultModal = ({ isWin, timer, onRestart, onBack }) => {
  useEffect(() => {
    if (isWin) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#22c55e', '#eab308']
      });
    }
  }, [isWin]);

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="modal-content"
      >
        <div style={{ marginBottom: '20px' }}>
          {isWin ? (
            <div style={{ color: 'var(--success-color)' }}>
              <Trophy size={64} style={{ margin: '0 auto' }} />
              <h2 className="modal-title" style={{ marginTop: '10px' }}>Victory!</h2>
              <p>You solved the puzzle in {timer}</p>
            </div>
          ) : (
            <div style={{ color: 'var(--error-color)' }}>
              <Frown size={64} style={{ margin: '0 auto' }} />
              <h2 className="modal-title" style={{ marginTop: '10px' }}>Game Over</h2>
              <p>You made too many mistakes.</p>
            </div>
          )}
        </div>
        
        <div className="modal-options">
          <button className="btn-full btn-primary" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <RotateCcw size={20} />
            Try Again
          </button>
          <button className="btn-full btn-secondary" onClick={onBack} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Home size={20} />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultModal;
