"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { useMatchEventsModal } from "../hooks/useMatchEventsModal";
import { EventFloatingFeedback } from "../components/EventFloatingFeedback";
import { MatchEventsModal } from "../components/MatchEventsModal";
import { NotFound } from "../components/NotFound";
import { MatchControls } from "../components/MatchControls";
import ProgressBar from "../components/ProgressBar";
import { MatchEventsSection } from "../components/MatchEventsSection";    
import { MatchHeader } from "../components/ MatchHeader";

export default function MatchAnalyzer() {
  const { id } = useParams();
  const match = useAppStore((s) => s.matches.find((m) => m.id === id));
  const feedback = useAppStore((s) => s.feedback); // feedback global

  const {
    playing,
    muted,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    seek,
    goToEvent,
    changeSpeed,
    startSlowMotion,
    stopSlowMotion,
    playbackRate,
  } = useYouTubePlayer(match?.videoUrl);

  const {
    showRegister,
    modalType,
    selectedLabels,
    customLabel,
    setCustomLabel,
    openRegister,
    toggleLabel,
    addCustomLabel,
    handleConfirm,
    setShowRegister,
  } = useMatchEventsModal(match?.id);

  if (!match) return <NotFound />;

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto space-y-8 bg-linear-to-b from-[#0b0b0b] via-[#0f1112] to-black text-gray-100 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <MatchHeader title={match.title} result={match.result} outcome={match.outcome} />

      <motion.div
        className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div id="youtube-player" className="w-full h-full" />
      </motion.div>

      <MatchControls
        playing={playing}
        togglePlay={togglePlay}
        muted={muted}
        toggleMute={toggleMute}
        seek={seek}
        changeSpeed={changeSpeed}
        playbackRate={playbackRate}
        startSlowMotion={startSlowMotion}
        stopSlowMotion={stopSlowMotion}
      />

      <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <ProgressBar current={currentTime} total={duration} onSeek={goToEvent} />
      </motion.div>

      <MatchEventsSection
        events={match.events}
        openRegister={openRegister}
        goToEvent={goToEvent}
      />

      <MatchEventsModal
        visible={showRegister}
        modalType={modalType}
        selectedLabels={selectedLabels}
        customLabel={customLabel}
        setCustomLabel={setCustomLabel}
        toggleLabel={toggleLabel}
        addCustomLabel={addCustomLabel}
        handleConfirm={(t: number) => handleConfirm(t)}
        currentTime={currentTime}
        hide={() => setShowRegister(false)}
      />

    
      {feedback && <EventFloatingFeedback text={feedback.text} type={feedback.type} />}
    </motion.div>
  );
}
