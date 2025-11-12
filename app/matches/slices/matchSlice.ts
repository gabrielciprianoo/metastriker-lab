import type { StateCreator } from "zustand";
import { Analysis } from "../types/analysis";

export type MatchSliceType = {
  matches: Analysis[];
  selectedMatch: Analysis | null;
  addMatch: (match: Analysis) => void;
  selectMatch: (id: string) => void;
  resetSelectedMatch: () => void;
};

export const createMatchSlice: StateCreator<MatchSliceType> = (set, get) => ({
  matches: [],
  selectedMatch: null,

  addMatch: (match) => set((state) => ({ matches: [...state.matches, match] })),

  selectMatch: (id) =>
    set((state) => ({
      selectedMatch: get().matches.find((m) => m.id === id) || null,
    })),

  resetSelectedMatch: () => set({ selectedMatch: null }),
});
