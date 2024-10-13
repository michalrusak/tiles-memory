import React, { useEffect } from "react";
import { useGameStore } from "../store/gameStore.ts";
import Tile from "./Tile";
import "./GameBoard.scss";

const GameBoard: React.FC = () => {
  const { tiles, resetGame, attempts, matchedPairs, revealTile } =
    useGameStore();

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="game-board">
      <div className="stats">
        <p>Attempts: {attempts}</p>
        <p>Matched Pairs: {matchedPairs}</p>
      </div>
      <div className="tiles-grid">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onReveal={revealTile} />
        ))}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default GameBoard;
