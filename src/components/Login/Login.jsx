import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, LogIn, Grid3X3 } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onLogin({ email, name: name || email.split('@')[0] });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="login-card glass"
      style={{
        padding: '2.5rem',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-md)',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: 'var(--primary)', 
          width: '64px', 
          height: '64px', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 1rem',
          color: 'white'
        }}>
          <Grid3X3 size={32} />
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>Sudokey</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Login to save your progress</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="input-group" style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              placeholder="name@example.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(255,255,255,0.5)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'var(--transition)'
              }}
            />
          </div>
        </div>

        <div className="input-group" style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Player Name (Optional)</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'var(--transition)'
            }}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary"
          style={{
            marginTop: '1rem',
            padding: '14px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <LogIn size={20} />
          Start Playing
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Your game history will be synced to your account.
      </p>
    </motion.div>
  );
};

export default Login;
