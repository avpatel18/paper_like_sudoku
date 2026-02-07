import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('loading'); // loading, login, home, game
  const [gameDifficulty, setGameDifficulty] = useState('medium');
  const [theme, setTheme] = useState(localStorage.getItem('sudoku-theme') || 'classic');

  useEffect(() => {
    // Check for existing user on initial mount
    const savedUser = localStorage.getItem('sudoku-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setScreen('home');
    } else {
      setScreen('login');
    }
  }, []); // Run only once

  useEffect(() => {
    // Apply theme separately when it changes
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogin = (userData) => {
    localStorage.setItem('sudoku-user', JSON.stringify(userData));
    setUser(userData);
    setScreen('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('sudoku-user');
    setUser(null);
    setScreen('login');
  };

  const startNewGame = (difficulty) => {
    setGameDifficulty(difficulty);
    setScreen('game');
  };

  const handleBackToHome = () => {
    setScreen('home');
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('sudoku-theme', newTheme);
  };

  if (screen === 'loading') return null;

  return (
    <div className="app-container">
      {screen === 'login' && <Login onLogin={handleLogin} />}
      {screen === 'home' && (
        <Home 
          user={user} 
          onStartGame={startNewGame} 
          onToggleTheme={toggleTheme}
          currentTheme={theme}
          onLogout={handleLogout}
        />
      )}
      {screen === 'game' && (
        <Game 
          difficulty={gameDifficulty} 
          onBack={handleBackToHome} 
          onToggleTheme={toggleTheme}
          currentTheme={theme}
        />
      )}
    </div>
  );
}

export default App;
