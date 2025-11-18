"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { Outcome } from "../hooks/useMatchForm";

interface Props {
  outcome: Outcome;
}

export function OutcomeIcon({ outcome }: Props) {
  const baseClasses = "w-16 h-16 rounded-full flex items-center justify-center shadow-lg";

  switch (outcome) {
    case "Ganado":
      return (
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.8 }}
          className={`${baseClasses} bg-emerald-800 text-emerald-400`}
        >
          <CheckCircleIcon className="w-12 h-12" />
        </motion.div>
      );
    case "Perdido":
      return (
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.8 }}
          className={`${baseClasses} bg-red-900 text-red-500`}
        >
          <XCircleIcon className="w-12 h-12" />
        </motion.div>
      );
    case "Empate":
      return (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8 }}
          className={`${baseClasses} bg-yellow-900 text-yellow-400`}
        >
          <MinusCircleIcon className="w-12 h-12" />
        </motion.div>
      );
  }
}
