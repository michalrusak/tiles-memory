import React, { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import Tile from "./Tile";
import "./GameBoard.scss";

const GameBoard: React.FC = () => {
  const {
    tiles,
    resetGame,
    attempts,
    matchedPairs,
    gameDuration,
    history,
    setLevel,
    isGameActive,
    revealTile,
  } = useGameStore();
  const [currentDuration, setCurrentDuration] = useState(0);
  const [level, setLocalLevel] = useState(1);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive) {
      interval = setInterval(() => {
        setCurrentDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCurrentDuration(0);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    setLocalLevel(newLevel);
    resetGame();
  };

  return (
    <div className="game-board">
      <div className="stats">
        <p>Attempts: {attempts}</p>
        <p>Matched Pairs: {matchedPairs}</p>
        <p>Time: {isGameActive ? currentDuration : gameDuration} s</p>
        <div className="level-select">
          <label>Level: </label>
          <select
            value={level}
            onChange={(e) => handleLevelChange(+e.target.value)}
          >
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
        </div>
      </div>

      <div className="tiles-grid">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onReveal={() => revealTile(tile)} />
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>

      <div className="history">
        <h3>Game History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              Attempts: {entry.attempts}, Duration: {entry.duration}s, Date:
              {entry.date}, Level: {entry.level}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameBoard;
