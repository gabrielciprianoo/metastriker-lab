
"use client";
import { motion } from "framer-motion";

export function MatchVideoPlayer() {
  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
    >
      <div id="youtube-player" className="w-full h-full" />
      
    </motion.div>
  );
}
