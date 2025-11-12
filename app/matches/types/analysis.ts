export type Analysis = {
  id: string;
  title: string;
  videoUrl: string;
  outcome: "Ganado" | "Perdido" | "Empate";
  result: string;

  metaPoints: number;
  strikes: number;

  keyStats: {
    goalsFor: number;
    goalsAgainst: number;
  };

  createdAt: string;
};
