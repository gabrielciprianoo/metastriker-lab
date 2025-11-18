"use client";

import { motion } from "framer-motion";

interface Props {
  homeGoals: number;
  awayGoals: number;
  setHomeGoals: (val: number) => void;
  setAwayGoals: (val: number) => void;
}

export function ScoreInput({ homeGoals, awayGoals, setHomeGoals, setAwayGoals }: Props) {
  return (
    <div className="flex items-center justify-center gap-6 relative">
      <div className="flex flex-col items-center">
        <span className="text-gray-400 uppercase text-sm mb-1">Tú</span>
        <motion.input
          key={homeGoals}
          type="number"
          value={homeGoals}
          min={0}
          onChange={(e) => setHomeGoals(Number(e.target.value))}
          className="w-28 text-center rounded-2xl bg-gray-900 text-white text-4xl font-extrabold focus:ring-emerald-400 focus:border-emerald-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <span className="text-white text-4xl font-bold">-</span>

      <div className="flex flex-col items-center">
        <span className="text-gray-400 uppercase text-sm mb-1">Rival</span>
        <motion.input
          key={awayGoals}
          type="number"
          value={awayGoals}
          min={0}
          onChange={(e) => setAwayGoals(Number(e.target.value))}
          className="w-28 text-center rounded-2xl bg-gray-900 text-white text-4xl font-extrabold focus:ring-emerald-400 focus:border-emerald-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
