"use client";

import { motion } from "framer-motion";
import { BoltIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Analysis } from "../types/analysis";
import { useRouter } from "next/navigation";

type MatchListProps = {
  analyses: Analysis[];
  showHeader?: boolean;
  onSelect?: (id: Analysis["id"]) => void; // override
  layout?: "grid" | "list";
  compact?: boolean;
};

export function MatchList({
  analyses,
  showHeader = false,
  onSelect,
  layout = "grid",
  compact = false,
}: MatchListProps) {
  const router = useRouter();

  const handleSelect = (id: string) => {
    if (onSelect) return onSelect(id); 
    router.push(`/matches/${id}`); 
  };

  return (
    <section className={compact ? "mt-6" : "mt-16"}>
      {showHeader && (
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Partidos</h2>
      )}

      {analyses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-52 border border-dashed border-gray-700/70 rounded-3xl backdrop-blur-lg bg-gray-900/40">
          <p className="text-gray-500 text-lg font-medium">
            Aún no hay partidos registrados.
          </p>
        </div>
      ) : (
        <motion.div
          className={
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col gap-4"
          }
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {analyses.map((a) => {
            const isWon = a.outcome === "Ganado";

            return (
              <motion.article
                key={a.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                onClick={() => handleSelect(a.id)}
                className={`relative overflow-hidden p-7 rounded-3xl border border-gray-700/60 cursor-pointer
                  bg-linear-to-b from-[#0b0b0b] via-[#0f1112] to-black backdrop-blur-2xl 
                  shadow-[0_0_20px_rgba(0,0,0,0.25)] transition-all duration-500
                  ${
                    isWon
                      ? "hover:shadow-emerald-500/20"
                      : "hover:shadow-red-500/20"
                  }
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl uppercase font-semibold text-gray-100 tracking-tight">
                    {a.title}
                  </h3>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold tracking-wide 
                      ${
                        isWon
                          ? "bg-emerald-400/20 text-emerald-400"
                          : "bg-red-400/20 text-red-400"
                      }
                    `}
                  >
                    {a.outcome}
                  </motion.span>
                </div>

                <div className="flex flex-col gap-2 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <BoltIcon className="h-5 w-5 text-emerald-400/80" />
                    <span>
                      Meta Points:
                      <span className="font-semibold text-gray-100">
                        {" "}
                        {a.metaPoints}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FireIcon className="h-5 w-5 text-red-400/80" />
                    <span>
                      Strikes:
                      <span className="font-semibold text-gray-100">
                        {" "}
                        {a.strikes}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrophyIcon className="h-5 w-5 text-yellow-400/80" />
                    <span>
                      Goles:
                      <span className="font-semibold text-gray-100">
                        {" "}
                        {a.keyStats.goalsFor}-{a.keyStats.goalsAgainst}
                      </span>
                    </span>
                  </div>
                </div>

                {!compact && (
                  <>
                    <span className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>
                    <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>
                  </>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
