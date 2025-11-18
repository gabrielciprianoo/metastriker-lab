"use client";
import { motion } from "framer-motion";
import { MatchEventControls } from "../components/MatchEventControls";
import { RecordedEventsList } from "../components/RecordedEventsList";
import { BoltIcon, FireIcon } from "@heroicons/react/24/solid";
import { MatchEvent } from "../types/analysis";

type EventWithIcon = MatchEvent & {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
};

type MatchEventsSectionProps = {
  events?: MatchEvent[];
  openRegister: (type: "META" | "STRIKE") => void;
  goToEvent: (time: number) => void;
  setFeedback: (text: string | null) => void;
};

export function MatchEventsSection({
  events,
  openRegister,
  goToEvent,
  setFeedback,
}: MatchEventsSectionProps) {
  const mappedEvents: EventWithIcon[] = events?.map((ev) => ({
    ...ev,
    Icon: ev.type === "meta" ? BoltIcon : ev.type === "strike" ? FireIcon : undefined,
    color: ev.type === "meta" ? "text-emerald-400" : ev.type === "strike" ? "text-red-500" : "text-gray-300",
  })) || [];

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <MatchEventControls
          openMeta={() => openRegister("META")}
          openStrike={() => openRegister("STRIKE")}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <RecordedEventsList
          events={mappedEvents}
          onSelect={(time: number, type: "meta" | "strike" | "custom") => {
            const text = type === "strike" ? "Strike" : type === "meta" ? "Meta" : "Evento";
            setFeedback(text);
            setTimeout(() => setFeedback(null), 1200);
            goToEvent(time);
          }}
        />
      </motion.div>
    </>
  );
}
