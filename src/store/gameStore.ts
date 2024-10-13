import { create } from "zustand";
import { ITile } from "../interfaces/ITile";
import { icons } from "../icons/icons";

type GameState = {
  tiles: ITile[];
  revealedTiles: ITile[];
  attempts: number;
  startTime: number | null;
  gameDuration: number;
  matchedPairs: number;
  resetGame: () => void;
  revealTile: (tile: ITile) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  attempts: 0,
  startTime: null,
  gameDuration: 0,
  matchedPairs: 0,

  resetGame: () => {
    set({
      tiles: shuffleTiles(generateTiles()),
      revealedTiles: [],
      attempts: 0,
      startTime: Date.now(),
      gameDuration: 0,
      matchedPairs: 0,
    });
  },

  revealTile: (tile: ITile) => {
    const { revealedTiles, tiles, attempts, matchedPairs } = get();
    if (revealedTiles.length === 2 || tile.revealed || tile.matched) return;

    const updatedTiles = tiles.map((t) =>
      t.id === tile.id ? { ...t, revealed: true } : t
    );

    set({ tiles: updatedTiles, revealedTiles: [...revealedTiles, tile] });

    if (revealedTiles.length === 1) {
      const firstTile = revealedTiles[0];
      const isMatch = firstTile.image === tile.image;

      setTimeout(() => {
        if (isMatch) {
          set({
            tiles: updatedTiles.map((t) =>
              t.image === tile.image ? { ...t, matched: true } : t
            ),
            matchedPairs: matchedPairs + 1,
          });
        } else {
          set({
            tiles: updatedTiles.map((t) =>
              t.id === firstTile.id || t.id === tile.id
                ? { ...t, revealed: false }
                : t
            ),
          });
        }

        set({
          revealedTiles: [],
          attempts: attempts + 1,
        });
      }, 1000);
    }
  },
}));

const generateTiles = (): ITile[] => {
  const tiles = icons.flatMap((image, id) => [
    { id: id * 2, image, revealed: false, matched: false },
    { id: id * 2 + 1, image, revealed: false, matched: false },
  ]);
  return tiles;
};

const shuffleTiles = (tiles: ITile[]): ITile[] => {
  return tiles.sort(() => Math.random() - 0.5);
};
