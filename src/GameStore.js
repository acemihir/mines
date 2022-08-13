import create from "zustand";
import produce from "immer";

const useGameStore = create((set) => ({
  walletAddress: "0x34dfvdfer33223dfsdf",
  boardState: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  gameStep: 1,
  nextMultiplier: 1,
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
  mineAmount: 10,
  houseEdge: 0.99,
  gameState: 0, // 0:before start, 1 : now playing,
  setNextMultiplier: (val) => {
    set({ nextMultiplier: val });
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

  setGameHistory: (value) => {
    set({ gameHistory: value });
  },
}));

export default useGameStore;
