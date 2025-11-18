"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

type NotFoundProps = {
  message?: string;
};

export function NotFound({ message = "Análisis no encontrado." }: NotFoundProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 bg-gradient-to-b from-[#0b0b0b] via-[#0f1112] to-black">
      {/* Icono principal con glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center justify-center w-28 h-28 bg-emerald-900/20 rounded-full shadow-2xl"
      >
        <ExclamationCircleIcon className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.7)]" />
      </motion.div>

      {/* Texto principal */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 20 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100"
      >
        {message}
      </motion.h1>

      {/* Texto secundario */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-base sm:text-lg"
      >
        Este análisis no está disponible o no existe.
      </motion.p>

      {/* Botón volver con glow al interactuar */}
      <motion.button
        onClick={handleBack}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(16,185,129,0.7)",
          backgroundColor: "#065f46",
        }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-black border border-emerald-500 text-emerald-400 rounded-xl shadow-lg font-semibold text-lg transition-all"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Volver
      </motion.button>
    </div>
  );
}
