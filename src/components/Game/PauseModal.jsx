import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const PauseModal = ({ onClose, onRestart, onContinue }) => {
  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-content"
      >
        <h2 className="modal-title">Game Paused</h2>
        
        <div className="modal-options">
          <button className="btn-full btn-primary" onClick={onContinue} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Play size={20} fill="white" />
            Continue
          </button>
          <button className="btn-full btn-secondary" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <RotateCcw size={20} />
            Restart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PauseModal;
