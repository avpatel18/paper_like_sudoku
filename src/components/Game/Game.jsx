import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Settings, Pause, Palette, RotateCcw, Play } from 'lucide-react';
import { generateSudoku, isValidMove } from '../../utils/sudoku';
import SudokuBoard from './SudokuBoard';
import Tools from './Tools';
import NumberPad from './NumberPad';
import Header from './Header';
import SettingsModal from './SettingsModal';
import PauseModal from './PauseModal';
import ResultModal from './ResultModal';
import './Game.css';

const Game = ({ difficulty, onBack, onToggleTheme, currentTheme }) => {
  const [gameState, setGameState] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null); // { r, c }
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pencilMode, setPencilMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [fontSize, setFontSize] = useState(1); // 1 = normal, 1.2 = large, etc.
  const [notifications, setNotifications] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);

  const timerRef = useRef(null);

  // Initialize game
  useEffect(() => {
    const data = generateSudoku(difficulty);
    setGameState(data);
    startTimer();
    return () => stopTimer();
  }, [difficulty]);

  // Timer logic
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isPaused || isGameFinished) {
      stopTimer();
    } else {
      startTimer();
    }
  }, [isPaused, isGameFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCellClick = (r, c) => {
    if (isPaused || isGameFinished) return;
    setSelectedCell({ r, c });
  };

  const handleNumberInput = useCallback((num) => {
    if (isPaused || isGameFinished || !selectedCell || !gameState) return;
    const { r, c } = selectedCell;
    
    // Check if it's an initial cell
    if (gameState.initialBoard[r][c] !== null) return;

    if (pencilMode) {
      // Logic for pencil marks (notes)
      const newGameState = { ...gameState };
      if (!newGameState.notes) newGameState.notes = Array(9).fill(null).map(() => Array(9).fill(null).map(() => []));
      
      const currentNotes = newGameState.notes[r][c];
      if (currentNotes.includes(num)) {
        newGameState.notes[r][c] = currentNotes.filter(n => n !== num);
      } else {
        newGameState.notes[r][c] = [...currentNotes, num].sort();
      }
      setGameState(newGameState);
      return;
    }

    // Save history for undo
    setHistory([...history, { 
      board: gameState.currentBoard.map(row => [...row]), 
      mistakes 
    }]);

    const isCorrect = gameState.solution[r][c] === num;
    const newBoard = gameState.currentBoard.map(row => [...row]);
    newBoard[r][c] = num;

    if (!isCorrect) {
      setMistakes(m => m + 1);
      if (mistakes + 1 >= 3) {
        setIsGameFinished(true);
        saveResult(false, newBoard);
      }
    } else {
      // Check for win
      const isWin = newBoard.every((row, ri) => 
        row.every((cell, ci) => cell === gameState.solution[ri][ci])
      );
      if (isWin) {
        setIsGameFinished(true);
        saveResult(true, newBoard);
      }
    }

    setGameState({ ...gameState, currentBoard: newBoard });
  }, [selectedCell, gameState, pencilMode, mistakes, history, isPaused, isGameFinished, timer, difficulty]);

  const saveResult = (won, board) => {
    const user = JSON.parse(localStorage.getItem('sudoku-user'));
    if (!user) return;
    
    const historyEntry = {
      date: new Date().toISOString(),
      difficulty,
      time: timer,
      mistakes,
      won,
      board: board.map(row => [...row]),
      solution: gameState.solution.map(row => [...row]),
      initialBoard: gameState.initialBoard.map(row => [...row])
    };
    
    const gameHistory = JSON.parse(localStorage.getItem(`history-${user.email}`) || '[]');
    gameHistory.unshift(historyEntry);
    localStorage.setItem(`history-${user.email}`, JSON.stringify(gameHistory.slice(0, 50))); // Keep last 50
  };

  const handleUndo = () => {
    if (history.length === 0 || isPaused || isGameFinished) return;
    const lastState = history[history.length - 1];
    setGameState({ ...gameState, currentBoard: lastState.board });
    setMistakes(lastState.mistakes);
    setHistory(history.slice(0, -1));
  };

  const handleErase = () => {
    if (isPaused || isGameFinished || !selectedCell || !gameState) return;
    const { r, c } = selectedCell;
    if (gameState.initialBoard[r][c] !== null) return;
    
    const newBoard = gameState.currentBoard.map(row => [...row]);
    newBoard[r][c] = null;
    setGameState({ ...gameState, currentBoard: newBoard });
  };

  const handleHint = () => {
    if (isPaused || isGameFinished || !selectedCell || !gameState || hintsUsed >= 3) return;
    const { r, c } = selectedCell;
    const correctVal = gameState.solution[r][c];
    
    // Don't count hint if cell already has correct value
    if (gameState.currentBoard[r][c] === correctVal) return;

    const newBoard = gameState.currentBoard.map(row => [...row]);
    newBoard[r][c] = correctVal;
    setGameState({ ...gameState, currentBoard: newBoard });
    setSelectedCell({ r, c });
    setHintsUsed(h => h + 1);
  };

  const handleRestart = () => {
    const data = generateSudoku(difficulty);
    setGameState(data);
    setMistakes(0);
    setTimer(0);
    setHistory([]);
    setHintsUsed(0);
    setIsPaused(false);
    setIsGameFinished(false);
    setShowPause(false);
  };

  if (!gameState) return null;

  return (
    <div className="game-wrapper" style={{ fontSize: `${fontSize}rem` }}>
      <header className="game-header">
        <button onClick={onBack} className="icon-btn"><ChevronLeft /></button>
        <div className="difficulty-tag">{difficulty.toUpperCase()}</div>
        <div className="header-actions">
          <button onClick={() => onToggleTheme(currentTheme === 'classic' ? 'dark' : currentTheme === 'dark' ? 'ocean' : 'classic')} className="icon-btn"><Palette /></button>
          <button onClick={() => setShowPause(true)} className="icon-btn"><Pause /></button>
          <button onClick={() => setShowSettings(true)} className="icon-btn"><Settings /></button>
        </div>
      </header>

      <div className="stats-bar">
        <div className="mistakes">
          {mistakes > 0 ? (
            <div style={{ display: 'flex', gap: '4px', color: 'var(--error-color)' }}>
              {Array(3).fill(0).map((_, i) => (
                <span key={i} style={{ opacity: i < mistakes ? 1 : 0.2 }}>❌</span>
              ))}
            </div>
          ) : (
            <span>Mistakes: 0/3</span>
          )}
        </div>
        <div className="timer">{formatTime(timer)}</div>
      </div>

      <div className="game-main">
        <SudokuBoard 
          board={gameState.currentBoard} 
          initialBoard={gameState.initialBoard}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          solution={gameState.solution}
          notes={gameState.notes || []}
          difficulty={difficulty}
        />
        
        <div className="controls-section">
          <Tools 
            onUndo={handleUndo} 
            onErase={handleErase} 
            onHint={handleHint} 
            pencilMode={pencilMode}
            onTogglePencil={() => setPencilMode(!pencilMode)}
            canUndo={history.length > 0}
            hintsUsed={hintsUsed}
          />
          <NumberPad onNumberInput={handleNumberInput} />
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)} 
            fontSize={fontSize}
            setFontSize={setFontSize}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        {showPause && (
          <PauseModal 
            onClose={() => setShowPause(false)} 
            onRestart={handleRestart}
            onContinue={() => setShowPause(false)}
          />
        )}
        {isGameFinished && (
          <ResultModal 
            isWin={mistakes < 3} 
            timer={formatTime(timer)}
            onRestart={handleRestart}
            onBack={onBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;
