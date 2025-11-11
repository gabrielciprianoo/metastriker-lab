export interface Analysis {
  id: number;
  title: string;
  result: string;
  outcome: "Ganado" | "Perdido";
  rank: { elo: number; label: string };
  matchesWon: number;
  matchesLost: number;
  metaPoints: number;
  strikes: number;
  videoUrl?: string;
  keyStats: { goalsFor: number; goalsAgainst: number };
}
