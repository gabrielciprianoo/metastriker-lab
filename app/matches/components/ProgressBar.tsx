"use client";
import { useRef, useState } from "react";

const ProgressBar = ({
  current,
  total,
  onSeek,
}: {
  current: number;
  total: number;
  onSeek: (time: number) => void;
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);

  const getTimeFromEvent = (e: MouseEvent | React.MouseEvent) => {
    if (!barRef.current) return 0;
    const rect = barRef.current.getBoundingClientRect();
    const x = "clientX" in e ? e.clientX - rect.left : 0;
    const percent = Math.min(Math.max(x / rect.width, 0), 1);
    return percent * total;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onSeek(getTimeFromEvent(e));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    onSeek(getTimeFromEvent(e));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max(x / rect.width, 0), 1);

    setHoverTime(percent * total);
    setHoverX(x);

    if (dragging) {
      onSeek(percent * total);
    }
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
    setDragging(false);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={barRef}
      className="
        relative w-full h-3 
        bg-[#0a0a0a] 
        rounded-full cursor-pointer 
        border border-neutral-700
        hover:border-emerald-500 
        transition-all
      "
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      {/* Barra de progreso */}
      <div
        className="
          absolute h-full 
          bg-emerald-500 
          rounded-full 
          shadow-[0_0_10px_rgba(16,185,129,0.4)]
          transition-all
        "
        style={{ width: `${(current / total) * 100}%` }}
      />

      {/* Indicador / "thumb" */}
      <div
        className="
          absolute w-4 h-4 
          bg-black 
          border border-emerald-400 
          rounded-full 
          shadow-[0_0_8px_rgba(16,185,129,0.6)]
          transition-all
        "
        style={{
          left: `${(current / total) * 100}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Tooltip */}
      {hoverTime !== null && (
        <div
          className="
            absolute -top-8 px-2 py-1 
            text-xs 
            bg-black text-neutral-200 
            border border-emerald-500 
            rounded 
            shadow-lg
            pointer-events-none
          "
          style={{ left: hoverX, transform: "translateX(-50%)" }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
