
export type MatchEvent = {
  id: string;
  type: "meta" | "strike" | "custom";
  label: string;
  time: number;
  createdAt?: string;
};

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

  events?: MatchEvent[];
  createdAt: string;
};
