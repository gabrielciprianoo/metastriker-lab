"use client";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      delay: i * 0.05,
    },
  }),
};

export function MotivationCard({ phrase }: { phrase: string }) {
  const words = phrase.split(" ");

  return (
    <section className="flex justify-center mt-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-4 max-w-5xl relative"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={wordVariants}
            className={clsx(
              "text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-200 tracking-tight",
              "inline-block relative animate-float-asym"
            )}
            whileHover={{
              scale: 1.15,
              textShadow: "0px 0px 20px #10B981",
              color: "#10B981",
              transition: { type: "spring", stiffness: 220, damping: 14 },
            }}
          >
            {word}
            {/* Glow dinámico detrás */}
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 animate-shimmer-slow pointer-events-none rounded-md"></span>
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
    