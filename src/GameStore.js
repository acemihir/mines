import create from "zustand";
import produce from "immer";

const useGameStore = create((set) => ({
  walletAddress: "0x12345",
  boardState: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  boardClickedState: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  gameStep: 0,
  solAmount: 0,
  nextMultiplier: 1,
  previousMultiplier: 1,
  gameHistory: [
    {
      game: "MineRush",
      player: "Ogur",
      wager: 0.25,
      payout: 4.25,
    },
    {
      game: "Guck",
      player: "Onur",
      wager: 0.8,
      payout: 9.25,
    },
  ],
  bettingAmount: 0.5,
  mineAmount: 5,
  houseEdge: 0.99,
  gameState: 0, // 0:before start, 1 : now playing,
  setNextMultiplier: (val) => {
    set({ nextMultiplier: val });
  },
  setPreviousMultiplier: (val) => {
    set({ previousMultiplier: val });
  },
  setGameStep: (val) => {
    set({ gameStep: val });
  },
  setGameState: (val) => {
    set({ gameState: val });
  },
  setMineAmount: (val) => {
    set({ mineAmount: val });
  },
  setBettingAmount: (val) => {
    set({ bettingAmount: val });
  },
  setWalletAddress: (value) => {
    set({ wallletAddress: value });
  },
  setBoardState: (value) => {
    set({ boardState: value });
  },
  setBoardClickedState: (val) => {
    set({ boardClickedState: val });
  },
  setGameHistory: (value) => {
    set({ gameHistory: value });
  },
  setSolAmount: (val) => {
    set({ solAmount: val });
  },
}));

export default useGameStore;
