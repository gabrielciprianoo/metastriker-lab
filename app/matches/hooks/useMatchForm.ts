import { useAppStore } from "@/stores/useAppStore";
import { useState, useMemo } from "react";

export type Outcome = "Ganado" | "Perdido" | "Empate";

export function useMatchForm() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);
  const [error, setError] = useState("");
  const closeRegisterMatch = useAppStore((s) => s.closeRegisterMatch);

  const outcome: Outcome = useMemo(() => {
    if (homeGoals > awayGoals) return "Ganado";
    if (homeGoals < awayGoals) return "Perdido";
    return "Empate";
  }, [homeGoals, awayGoals]);

  const resetForm = () => {
    closeRegisterMatch();

    setTimeout(() => {
      setTitle("");
      setVideoUrl("");
      setHomeGoals(0);
      setAwayGoals(0);
      setError("");
    }, 500);
  };

  return {
    title,
    setTitle,
    videoUrl,
    setVideoUrl,
    homeGoals,
    setHomeGoals,
    awayGoals,
    setAwayGoals,
    outcome,
    error,
    setError,
    resetForm,
  };
}
