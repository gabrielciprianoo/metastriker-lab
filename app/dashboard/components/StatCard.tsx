"use client";
import { motion } from "framer-motion";
import clsx from "clsx";

export function StatCard({
  Icon,
  label,
  value,
  insight,
}: {
  Icon: React.ElementType;
  label: string;
  value: string | number;
  insight: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={clsx(
        "group relative bg-linear-to-b from-[#0b0b0b] via-[#0f1112] to-black",
        "border border-gray-700/60 rounded-3xl p-6 text-center shadow-md",
        "hover:shadow-[0_0_20px_rgba(52,211,153,0.15)] transition-all duration-500",
        "overflow-hidden cursor-pointer backdrop-blur-xl"
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.08)_0%,transparent_70%)]" />

      <div className="relative flex justify-center items-center mb-4">
        <Icon className="h-10 w-10 text-emerald-400/80 group-hover:text-emerald-300 transition-colors duration-500 drop-shadow-[0_0_6px_rgba(52,211,153,0.25)]" />
      </div>

      <p className="text-sm uppercase tracking-wide text-gray-400 font-medium">
        {label}
      </p>

      <p className="text-5xl font-extrabold  mt-2 bg-linear-to-r from-gray-100 via-emerald-200 to-gray-100 bg-clip-text text-transparent">
        {value}
      </p>

      <p className="text-xs mt-2 text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
        {insight}
      </p>

      <span className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>
      <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></span>
    </motion.div>
  );
}
