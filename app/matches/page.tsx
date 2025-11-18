"use client";

import HeaderBack from "@/components/app/HeaderBack";
import { MatchExplorer } from "./components/MatchExplorer";

export default function MatchesPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8 bg-linear-to-b from-[#0b0b0b] via-[#0f1112] to-black text-gray-100 rounded-2xl shadow-lg min-h-screen">
      {/* Header */}
      <HeaderBack />

      {/* Explorador de partidos */}
      <MatchExplorer />
    </main>
  );
}
