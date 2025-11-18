"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/stores/useAppStore"; 

export function useMatches() {
  const matches = useAppStore((s) => s.matches);

  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "won" | "lost">("all");

  const filtered = useMemo(() => {
    let data = [...matches];

   
    if (search.trim()) {
      data = data.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    
    if (filter === "won") data = data.filter((m) => m.outcome === "Ganado");
    if (filter === "lost") data = data.filter((m) => m.outcome === "Perdido");

    return data;
  }, [matches, search, filter]);

  return {
    matches,
    filtered,
    search,
    setSearch,
    filter,
    setFilter,
  };
}
