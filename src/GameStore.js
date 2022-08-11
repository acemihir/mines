import create from "zustand";
import produce from "immer";

const useGameStore = create((set) => ({
  walletAddress: "0x34dfvdf",
  boardState: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  setWalletAddress: (value) => {
    set({ wallletAddress: value });
  },
  setBoardState: (value) => {
    set({ boardState: value });
  },
}));

export default useGameStore;
