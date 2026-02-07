import React from 'react';
import { motion } from 'framer-motion';

const SettingsModal = ({ onClose, fontSize, setFontSize, notifications, setNotifications }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-content" 
        onClick={e => e.stopPropagation()}
      >
        <h2 className="modal-title">Settings</h2>
        
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="setting-item">
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Number Size</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0.8, 1, 1.2, 1.4].map(size => (
                <button 
                  key={size}
                  onClick={() => setFontSize(size)}
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    borderRadius: '8px', 
                    background: fontSize === size ? 'var(--primary)' : 'var(--bg-color)',
                    color: fontSize === size ? 'white' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    fontWeight: '600'
                  }}
                >
                  {size === 1 ? 'Std' : size < 1 ? 'Sm' : size > 1.2 ? 'XL' : 'Lg'}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: '600' }}>Notifications</p>
            <button 
              onClick={() => setNotifications(!notifications)}
              style={{ 
                width: '50px', 
                height: '26px', 
                borderRadius: '13px', 
                background: notifications ? 'var(--primary)' : '#cbd5e1',
                padding: '3px',
                position: 'relative',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                background: 'white',
                transform: notifications ? 'translateX(24px)' : 'translateX(0)',
                transition: 'var(--transition)'
              }} />
            </button>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button className="btn-full btn-primary" onClick={onClose}>Done</button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
