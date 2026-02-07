import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, History, Trophy, User, X, LogOut } from 'lucide-react';
import HistoryBoard from './HistoryBoard';

const Home = ({ user, onStartGame, onToggleTheme, currentTheme, onLogout }) => {
  const [history, setHistory] = React.useState([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const [selectedHistoryEntry, setSelectedHistoryEntry] = React.useState(null);

  React.useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(`history-${user.email}`) || '[]');
    setHistory(savedHistory);
  }, [user.email]);

  const difficulties = [
    { id: 'easy', label: 'Easy', color: '#22c55e', description: 'Perfect for beginners' },
    { id: 'medium', label: 'Medium', color: '#eab308', description: 'A solid challenge' },
    { id: 'hard', label: 'Hard', color: '#f97316', description: 'For experienced players' },
    { id: 'expert', label: 'Expert', color: '#ef4444', description: 'Master logic only' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="home-container" style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '0', flex: '1 1 auto' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}>
            <User size={20} />
          </div>
          <div style={{ minWidth: '0', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Hello, {user.name}!</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="icon-btn glass" 
            style={{ padding: '8px', borderRadius: '10px', position: 'relative', flexShrink: 0 }}
          >
            <History size={20} color={showHistory ? 'var(--primary)' : 'var(--text-muted)'} />
            {history.length > 0 && (
              <div style={{ position: 'absolute', top: -4, right: -4, width: '16px', height: '16px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {history.length}
              </div>
            )}
          </button>
          <div className="theme-selector glass" style={{ display: 'flex', padding: '4px', borderRadius: '12px', gap: '4px', flexShrink: 0 }}>
            {['classic', 'dark', 'ocean', 'forest'].map(t => (
              <button 
                key={t}
                onClick={() => onToggleTheme(t)}
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '6px', 
                  backgroundColor: t === 'classic' ? '#3b82f6' : t === 'dark' ? '#1e293b' : t === 'ocean' ? '#0ea5e9' : '#10b981',
                  border: currentTheme === t ? '2px solid white' : 'none',
                  boxShadow: currentTheme === t ? '0 0 0 1px var(--primary)' : 'none'
                }}
              />
            ))}
          </div>
          <button
            onClick={onLogout}
            className="icon-btn glass"
            style={{ padding: '8px', borderRadius: '10px', color: 'var(--text-muted)', flexShrink: 0 }}
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.02)', 
              borderRadius: '20px', 
              padding: '20px', 
              marginBottom: '2rem',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: '700' }}>Game History</h4>
              <button 
                onClick={() => {
                  localStorage.removeItem(`history-${user.email}`);
                  setHistory([]);
                }}
                style={{ fontSize: '0.8rem', color: 'var(--error-color)', fontWeight: '600' }}
              >
                Clear All
              </button>
            </div>
            {history.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '20px 0' }}>No games played yet. Start your first game!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {history.map((entry, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => entry.board && setSelectedHistoryEntry(entry)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '12px 16px', 
                      backgroundColor: 'var(--card-bg)', 
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: entry.board ? 'pointer' : 'default',
                      border: '1px solid transparent',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => entry.board && (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: entry.won ? 'var(--success-color)' : 'var(--error-color)' 
                      }} />
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{entry.difficulty.toUpperCase()}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(entry.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{formatTime(entry.time)}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{entry.won ? 'Solved' : `Failed (${entry.mistakes} hits)`}</div>
                      </div>
                      {entry.board && <Play size={14} style={{ color: 'var(--primary)', opacity: 0.5 }} />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedHistoryEntry && (
          <div className="modal-overlay" onClick={() => setSelectedHistoryEntry(null)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content" 
              style={{ maxWidth: '400px' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="modal-title" style={{ margin: 0 }}>Game Details</h3>
                <button onClick={() => setSelectedHistoryEntry(null)} className="icon-btn">
                  <X />
                </button>
              </div>

              <div style={{ marginBottom: '20px', padding: '15px', borderRadius: '15px', backgroundColor: 'rgba(0,0,0,0.02)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Difficulty:</span>
                  <span style={{ fontWeight: '700' }}>{selectedHistoryEntry.difficulty.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Time Taken:</span>
                  <span style={{ fontWeight: '700' }}>{formatTime(selectedHistoryEntry.time)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Status:</span>
                  <span style={{ fontWeight: '700', color: selectedHistoryEntry.won ? 'var(--success-color)' : 'var(--error-color)' }}>
                    {selectedHistoryEntry.won ? 'Solved ✓' : 'Failed ✗'}
                  </span>
                </div>
              </div>

              <HistoryBoard 
                board={selectedHistoryEntry.board}
                initialBoard={selectedHistoryEntry.initialBoard}
                solution={selectedHistoryEntry.solution}
              />

              <button 
                className="btn-full btn-primary" 
                style={{ marginTop: '20px' }}
                onClick={() => setSelectedHistoryEntry(null)}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div variants={container} initial="hidden" animate="show">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Sudokey</h1>
          <p style={{ color: 'var(--text-muted)' }}>Choose your challenge level</p>
        </div>

        <div className="difficulty-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '3rem' }}>
          {difficulties.map((diff) => (
            <motion.button
              key={diff.id}
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartGame(diff.id)}
              className="glass"
              style={{
                padding: '24px',
                borderRadius: '20px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: diff.color,
                boxShadow: (diff.id === 'easy' || diff.id === 'medium') ? `0 0 10px ${diff.color}88` : 'none'
              }} />
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{diff.label}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{diff.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => onStartGame('medium')}
            style={{
              padding: '16px 48px',
              borderRadius: '30px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 20px -5px var(--primary)66'
            }}
          >
            <Play size={24} fill="white" />
            Quick Play
          </button>
        </motion.div>
      </motion.div>

      <footer style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '16px', backgroundColor: 'rgba(0,0,0,0.03)' }}>
          <Trophy size={18} color="#eab308" />
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Daily Challenge: Beat Hard in 5 mins!</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
