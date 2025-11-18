"use client";

import { motion } from "framer-motion";
import { TrophyIcon, XCircleIcon, ScaleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import HeaderBack from "@/components/app/HeaderBack";

interface MatchHeaderProps {
  title: string;
  result: string;
  outcome: "Ganado" | "Perdido" | "Empate";
}

export function MatchHeader({ title, result, outcome }: MatchHeaderProps) {
  const outcomeData = {
    Ganado: { Icon: TrophyIcon, color: "text-emerald-400", label: "Ganado" },
    Perdido: { Icon: XCircleIcon, color: "text-red-500", label: "Perdido" },
    Empate: { Icon: ScaleIcon, color: "text-yellow-400", label: "Empate" },
  }[outcome];

  return (
    <header className="relative p-6 rounded-3xl bg-linear-to-b from-[#0b0b0b] via-[#0f1112] to-black shadow-2xl mt-0 overflow-hidden">

     
      <HeaderBack/>

     
      <motion.h1
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-100 drop-shadow-lg text-center uppercase tracking-wide"
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex flex-col items-center mt-4 gap-2"
      >
        <motion.div
          className="relative inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-black/40 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
      
          <div className="absolute left-0 h-full w-1 bg-emerald-400/30 rounded-l-xl animate-pulse" />
          <div className="absolute right-0 h-full w-1 bg-emerald-400/30 rounded-r-xl animate-pulse" />

          <motion.div
            className={`h-7 w-7 ${outcomeData.color} drop-shadow-md`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <outcomeData.Icon className="h-full w-full" />
          </motion.div>

        
          <motion.span
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${outcomeData.color} drop-shadow-md`}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.25 }}
            whileHover={{
              scale: 1.1,
              textShadow: `0 0 15px ${outcomeData.color.replace("text-", "#")}`,
            }}
          >
            {result}
          </motion.span>

         
          <motion.span
            className={`text-lg sm:text-xl font-semibold ${outcomeData.color} drop-shadow-sm uppercase`}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {outcomeData.label}
          </motion.span>
        </motion.div>
      </motion.div>

     
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(16,185,129,0.06)_0%,transparent_80%)] -z-10 blur-3xl"
      />
    </header>
  );
}
