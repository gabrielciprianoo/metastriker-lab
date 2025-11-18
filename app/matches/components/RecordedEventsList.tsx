"use client";

import {
  PlayIcon,
  CheckCircleIcon,
  BoltIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { MatchEvent } from "../types/analysis";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  events?: MatchEvent[];
  onSelect: (time: number, type: "meta" | "strike" | "custom") => void;
};

export function RecordedEventsList({ events = [], onSelect }: Props) {
  const [filter, setFilter] = useState<"all" | "meta" | "strike">("all");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === "all") return true;
    return ev.type === filter;
  });

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 py-12 px-6 space-y-4 bg-black/40 border border-white/5 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-sm">
        <BoltIcon className="w-12 h-12 text-emerald-400 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-200">
          Eventos registrados
        </h3>
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          Aún no hay eventos registrados.
          <br />
          Comienza a registrar metas y strikes para verlos aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4">
      <h3 className="text-2xl font-bold text-gray-100 mb-3">
        Eventos registrados
      </h3>

      {/* Filtros con iconos */}
      <div className="flex gap-2 mb-5">
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
            filter === "all"
              ? "bg-black/40 text-white border border-emerald-500 shadow-md shadow-black/40"
              : "bg-black/20 text-gray-300 hover:bg-black/30"
          }`}
          onClick={() => setFilter("all")}
        >
          <PlayIcon className="w-5 h-5" />
          Todos
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
            filter === "meta"
              ? "bg-black/40 text-emerald-400 border border-emerald-500 shadow-md shadow-black/40"
              : "bg-black/20 text-gray-300 hover:bg-black/30"
          }`}
          onClick={() => setFilter("meta")}
        >
          <BoltIcon className="w-5 h-5 text-emerald-400" />
          Metas
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
            filter === "strike"
              ? "bg-black/40 text-red-500 border border-red-500 shadow-md shadow-black/40"
              : "bg-black/20 text-gray-300 hover:bg-black/30"
          }`}
          onClick={() => setFilter("strike")}
        >
          <FireIcon className="w-5 h-5 text-red-500" />
          Strikes
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="py-12">
          <p className="text-gray-400 text-sm text-center">
            No hay eventos de este tipo.
          </p>
        </div>
      ) : (
        filteredEvents.map((ev) => (
          <motion.div
            key={ev.id}
            whileHover={{ scale: 1.02 }}
            className="
              p-4 rounded-xl flex items-center justify-between cursor-pointer
              bg-black/40 border border-white/5 
              hover:bg-black/60
              transition-all duration-200
              shadow-lg shadow-black/40
              backdrop-blur-sm
            "
            onClick={() => onSelect(ev.time, ev.type)}
          >
            <div className="flex items-center gap-4">
              {/* ICONO + MEDALLÓN */}
              <div
                className={`
      w-12 h-12 flex items-center justify-center rounded-xl shadow-lg 
      backdrop-blur-md border 
      ${ev.type === "meta" ? "border-emerald-500/40 bg-emerald-500/10" : ""}
      ${ev.type === "strike" ? "border-red-500/40 bg-red-500/10" : ""}
      ${ev.type === "custom" ? "border-blue-500/40 bg-blue-500/10" : ""}
    `}
              >
                {ev.type === "meta" && (
                  <BoltIcon className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                )}
                {ev.type === "strike" && (
                  <FireIcon className="w-7 h-7 text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]" />
                )}
                {ev.type === "custom" && (
                  <CheckCircleIcon className="w-7 h-7 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                )}
              </div>

              {/* TEXTO */}
              <div className="flex flex-col">
                <p className="font-semibold text-gray-100 text-lg tracking-wide">
                  {ev.label}
                </p>
                <p className="text-xs text-gray-400">
                  {ev.type.toUpperCase()} · {formatTime(ev.time)}
                </p>
              </div>
            </div>

            <PlayIcon className="w-5 h-5 text-gray-400 hover:text-emerald-400 transition-colors" />
          </motion.div>
        ))
      )}
    </div>
  );
}
