"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FireIcon, BoltIcon } from "@heroicons/react/24/solid";

type Props = {
  text: string;
  type: "STRIKE" | "META";
};

export function EventFloatingFeedback({ text, type }: Props) {
  const isStrike = type === "STRIKE";
  const colorClass = isStrike ? "text-red-500" : "text-emerald-400";
  const Icon = isStrike ? FireIcon : BoltIcon;

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          key={text}
          initial={{ scale: 0.5, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          
          <motion.div
            className={`absolute inset-0 ${isStrike ? "bg-red-500/20" : "bg-emerald-500/20"} rounded-xl blur-2xl`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div className="relative flex items-center gap-3 px-6 py-3 bg-black/70 rounded-xl shadow-xl">
         
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 20, -20, 0] }}
              exit={{ scale: 0 }}
              transition={{ type: "tween", duration: 0.8 }}
            >
              <Icon className={`h-8 w-8 ${colorClass} drop-shadow-lg`} />
            </motion.div>

            
            <motion.span
              className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colorClass} drop-shadow-md uppercase tracking-wide`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {text}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
