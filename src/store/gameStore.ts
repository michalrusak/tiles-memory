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
  history: {
    attempts: number;
    duration: number;
    date: string;
    level: number;
  }[];
  level: number;
  isGameActive: boolean;
  resetGame: () => void;
  revealTile: (tile: ITile) => void;
  setLevel: (level: number) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  attempts: 0,
  startTime: null,
  gameDuration: 0,
  matchedPairs: 0,
  history: JSON.parse(localStorage.getItem("gameHistory") || "[]"),
  level: 1,
  isGameActive: false,

  resetGame: () => {
    const { level } = get();
    set({
      tiles: shuffleTiles(generateTiles(level)),
      revealedTiles: [],
      attempts: 0,
      startTime: null,
      gameDuration: 0,
      matchedPairs: 0,
      isGameActive: false,
    });
  },

  revealTile: (tile: ITile) => {
    const {
      revealedTiles,
      tiles,
      attempts,
      matchedPairs,
      history,
      startTime,
      isGameActive,
    } = get();
    if (revealedTiles.length === 2 || tile.revealed || tile.matched) return;

    if (!isGameActive) {
      set({ startTime: Date.now(), isGameActive: true });
    }

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

          if (matchedPairs + 1 === tiles.length / 2) {
            const gameData = {
              attempts: attempts + 1,
              duration: Math.floor((Date.now() - (startTime || 0)) / 1000),
              date: new Date().toLocaleString(),
              level: get().level,
            };
            const newHistory = [...history, gameData];
            localStorage.setItem("gameHistory", JSON.stringify(newHistory));
            set({ history: newHistory, isGameActive: false });
          }
        } else {
          set({
            tiles: updatedTiles.map((t) =>
              t.id === firstTile.id || t.id === tile.id
                ? { ...t, revealed: false }
                : t
            ),
          });
        }

        set({ revealedTiles: [], attempts: attempts + 1 });
      }, 500);
    }
  },

  setLevel: (level: number) => set({ level }),
}));

const generateTiles = (level: number): ITile[] => {
  const selectedIcons = icons.slice(0, level * 4);
  const tiles = selectedIcons.flatMap((image, id) => [
    { id: id * 2, image, revealed: false, matched: false },
    { id: id * 2 + 1, image, revealed: false, matched: false },
  ]);
  return tiles;
};

const shuffleTiles = (tiles: ITile[]): ITile[] => {
  return tiles.sort(() => Math.random() - 0.5);
};
