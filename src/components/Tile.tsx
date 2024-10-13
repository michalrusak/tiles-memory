import React from "react";
import "./Tile.scss";
import { ITile } from "../interfaces/ITile";
import { questionMark } from "../icons/icons";

interface TileProps {
  tile: ITile;
  onReveal: (tile: ITile) => void;
}

const Tile: React.FC<TileProps> = ({ tile, onReveal }) => {
  return (
    <button
      className={`tile ${tile.revealed ? "revealed" : ""}`}
      onClick={() => onReveal(tile)}
      disabled={tile.revealed || tile.matched}
    >
      {tile.revealed || tile.matched ? tile.image : questionMark}
    </button>
  );
};

export default Tile;
