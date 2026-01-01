import React from 'react';
import { useSudoku } from './hooks/useSudoku';
import './styles/index.css';

// Components (defined in file for now for speed, can separate later if needed or split if too large)
// Actually I will split them as planned.

import Header from './components/Header';
import SudokuBoard from './components/SudokuBoard';
import Controls from './components/Controls';
import Numpad from './components/Numpad';
import Menu from './components/Menu';

function App() {
  const gameState = useSudoku();

  // Removed auto-start useEffect to show Menu first.

  if (gameState.status === 'idle') {
    return <Menu onStart={gameState.newGame} />;
  }

  return (
    <div className="app-container">
      <Header
        difficulty={gameState.difficulty}
        timer={gameState.timer}
        mistakes={gameState.mistakes}
        status={gameState.status}
        onBack={gameState.quitGame} // Connect back button
      />

      <SudokuBoard
        board={gameState.board}
        selectedCell={gameState.selectedCell}
        onSelectCell={gameState.selectCell}
      />

      <Controls
        onUndo={gameState.undo}
        onErase={gameState.erase}
        onToggleNotes={gameState.toggleNotes}
        notesMode={gameState.notesMode}
        onHint={gameState.getHint} // Connect hint button
      />

      <Numpad
        onInput={gameState.inputNumber}
      />
    </div>
  );
}

export default App;
