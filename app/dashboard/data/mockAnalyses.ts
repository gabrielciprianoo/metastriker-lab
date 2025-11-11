import { Analysis } from "../types/analysis";

export const mockAnalyses: Analysis[] = [
  {
    id: 1,
    title: "Match vs Lucas",
    result: "3-1",
    outcome: "Ganado",
    rank: { elo: 3004, label: "Elite II" },
    matchesWon: 18,
    matchesLost: 6,
    metaPoints: 85,
    strikes: 12,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    keyStats: { goalsFor: 3, goalsAgainst: 1 },
  },
  {
    id: 2,
    title: "Match vs Diego",
    result: "0-2",
    outcome: "Perdido",
    rank: { elo: 2987, label: "Elite II" },
    matchesWon: 14,
    matchesLost: 10,
    metaPoints: 78,
    strikes: 9,
    keyStats: { goalsFor: 0, goalsAgainst: 2 },
  },
];
