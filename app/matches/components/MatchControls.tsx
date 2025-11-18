"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  BackwardIcon,
  ForwardIcon,
  ClockIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

type MatchControlsProps = {
  playing: boolean;
  togglePlay: () => void;
  muted: boolean;
  toggleMute: () => void;
  seek: (seconds: number) => void;
  changeSpeed: () => void;
  playbackRate: number;
  startSlowMotion: () => void;
  stopSlowMotion: () => void;
};

export function MatchControls({
  playing,
  togglePlay,
  muted,
  toggleMute,
  seek,
  changeSpeed,
  playbackRate,
  startSlowMotion,
  stopSlowMotion,
}: MatchControlsProps) {
  const baseButton =
    "bg-[#0f0f0f] border border-neutral-700 text-neutral-300 hover:border-emerald-500 hover:text-emerald-400 transition-all cursor-pointer shadow-lg shadow-black/20";

  return (
    <motion.div
      className="flex flex-wrap items-center gap-3 mt-4 justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
    
      <Button
        className={`bg-emerald-600/20 border border-emerald-600/40 hover:bg-emerald-600/30 hover:border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-600/10 transition-all cursor-pointer`}
        onClick={togglePlay}
      >
        {playing ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayIcon className="w-6 h-6" />
        )}
      </Button>

      
      <Button
        className={`${baseButton} flex items-center gap-1`}
        onClick={() => seek(-5)}
      >
        <BackwardIcon className="w-5 h-5" />
        -5s
      </Button>

     
      <Button
        className={`${baseButton} flex items-center gap-1`}
        onClick={() => seek(5)}
      >
        +5s
        <ForwardIcon className="w-5 h-5" />
      </Button>

     
      <Button className={baseButton} onClick={toggleMute}>
        {muted ? (
          <SpeakerXMarkIcon className="w-5 h-5" />
        ) : (
          <SpeakerWaveIcon className="w-5 h-5" />
        )}
      </Button>

     
      <Button
        className={`${baseButton} flex items-center gap-1`}
        onClick={changeSpeed}
      >
        <BoltIcon className="w-5 h-5" />
        {playbackRate}x
      </Button>

     
      <Button
        className={`${baseButton} flex items-center gap-1`}
        onMouseDown={startSlowMotion}
        onMouseUp={stopSlowMotion}
        onMouseLeave={stopSlowMotion}
      >
        <ClockIcon className="w-5 h-5" />
        Cámara lenta
      </Button>
    </motion.div>
  );
}
