"use client";
import { useState, useMemo } from "react";
import { mockAnalyses } from "../data/mockAnalyses";
import { phrases } from "../constants/phrases";

export function useDashboardData() {
  const [analyses] = useState(mockAnalyses);

  const stats = useMemo(() => {
    const totalMetaPoints = analyses.reduce((a, b) => a + b.metaPoints, 0);
    const totalStrikes = analyses.reduce((a, b) => a + b.strikes, 0);
    const totalMatches = analyses.length;
    const totalWon = analyses.filter((a) => a.outcome === "Ganado").length;
    const totalLost = analyses.filter((a) => a.outcome === "Perdido").length;
    const accuracyRatio = (
      (totalMetaPoints / (totalMetaPoints + totalStrikes)) *
      100
    ).toFixed(1);

    return {
      totalMetaPoints,
      totalStrikes,
      totalMatches,
      totalWon,
      totalLost,
      accuracyRatio,
    };
  }, [analyses]);

  const [randomPhrase] = useState<string>(
    () => phrases[Math.floor(Math.random() * phrases.length)]
  );

  return { analyses, stats, randomPhrase };
}
