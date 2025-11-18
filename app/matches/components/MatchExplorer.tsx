"use client";


import { useMatches } from "../hooks/useMatches";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MatchList } from "./MatchList";

export function MatchExplorer() {
  const { search, setSearch, filter, setFilter, filtered } = useMatches();

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-black/40 border border-gray-700 px-4 py-2 rounded-xl w-full sm:w-80">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar partido..."
            className="bg-transparent outline-none text-gray-200 w-full"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "won" ? "default" : "ghost"}
            onClick={() => setFilter("won")}
          >
            Ganados
          </Button>
          <Button
            variant={filter === "lost" ? "default" : "ghost"}
            onClick={() => setFilter("lost")}
          >
            Perdidos
          </Button>
        </div>
      </div>

      {/* List */}
      <MatchList analyses={filtered} />
    </div>
  );
}
