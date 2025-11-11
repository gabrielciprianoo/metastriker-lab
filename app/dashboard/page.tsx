"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  TrophyIcon,
  BoltIcon,
  FireIcon,
  UserGroupIcon,
  PlayIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDashboardData } from "./hooks/useDashboardData";
import { StatCard } from "./components/StatCard";
import { MatchList } from "./components/MatchList";
import { MotivationCard } from "./components/MotivationCard";

export default function DashboardPage() {
  const { analyses, stats, randomPhrase } = useDashboardData();

  return (
    <main className="min-h-screen bg-linear-to-b from-[#0b0b0b] via-[#0f1112] to-black text-gray-100 p-6 md:p-10 space-y-20 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,255,180,0.08)_0%,transparent_70%)] blur-3xl -z-10"
      />

      <header className="flex flex-col items-center text-center gap-3 mt-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Image
            src="/logo.jpg"
            alt="MetaStriker Logo"
            width={70}
            height={70}
            className="drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            priority
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-gray-300 via-gray-400 to-emerald-400 bg-clip-text text-transparent text-center sm:text-left leading-tight">
            MetaStriker <span className="text-emerald-300">Lab</span>
          </h1>

          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Precision & Performance
          </p>
        </motion.div>
      </header>

      <div className="mt-4">
        <MotivationCard phrase={randomPhrase} />
      </div>

      <section className="flex justify-center my-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Button
            className="relative overflow-hidden bg-linear-to-r cursor-pointer from-emerald-500 to-emerald-400 text-white font-semibold text-lg px-10 py-5 rounded-2xl shadow-md
    transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-emerald-500/40 hover:scale-[1.03]"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 blur-sm transition-opacity duration-700 animate-[shine_2.5s_linear_infinite]" />
            <PlayIcon className="h-8 w-8 text-white" />
            <span className="relative z-10">Registrar Partido</span>
          </Button>
        </motion.div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            Icon={BoltIcon}
            label="Meta Points"
            value={stats.totalMetaPoints}
            insight="Total de aciertos"
          />
          <StatCard
            Icon={FireIcon}
            label="Strikes"
            value={stats.totalStrikes}
            insight="Errores analizados"
          />
          <StatCard
            Icon={UserGroupIcon}
            label="Partidos"
            value={stats.totalMatches}
            insight={`Ganados: ${stats.totalWon}, Perdidos: ${stats.totalLost}`}
          />
          <StatCard
            Icon={TrophyIcon}
            label="Eficiencia"
            value={`${stats.accuracyRatio}%`}
            insight="Precisión total"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
            Últimos partidos
          </h2>
          <Button
            variant="ghost"
            className="text-sm font-medium text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 flex items-center gap-1 transition-all duration-300 rounded-lg cursor-pointer"
          >
            Ver todos
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        <MatchList analyses={analyses} />
      </section>
    </main>
  );
}
