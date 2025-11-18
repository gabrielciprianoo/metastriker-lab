
import type { StateCreator } from "zustand";
import type { Analysis, MatchEvent } from "../types/analysis";

export type MatchSliceType = {
  matches: Analysis[];
  selectedMatch: Analysis | null;
  feedback: { text: string; type: "STRIKE" | "META" } | null; 

  addMatch: (match: Analysis) => void;
  selectMatch: (id: string) => void;
  resetSelectedMatch: () => void;

  addEventToMatch: (matchId: string, event: MatchEvent) => void;
  removeEventFromMatch: (matchId: string, eventId: string) => void;
  setFeedback: (fb: { text: string; type: "STRIKE" | "META" } | null) => void;
};

export const createMatchSlice: StateCreator<MatchSliceType> = (set, get) => ({
  matches: [],
  selectedMatch: null,
  feedback: null,

  addMatch: (match) =>
    set((state) => ({
      matches: [...state.matches, match],
    })),

  selectMatch: (id) =>
    set(() => ({
      selectedMatch: get().matches.find((m) => m.id === id) || null,
    })),

  addEventToMatch: (matchId, event) =>
    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId
          ? { ...m, events: [...(m.events ?? []), event] }
          : m
      ),
    })),

  removeEventFromMatch: (matchId, eventId) =>
    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId
          ? { ...m, events: (m.events ?? []).filter((e) => e.id !== eventId) }
          : m
      ),
    })),

  resetSelectedMatch: () =>
    set(() => ({
      selectedMatch: null,
    })),

     setFeedback: (fb) => set({ feedback: fb }),
});
