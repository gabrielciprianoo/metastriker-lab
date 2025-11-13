"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/useAppStore";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

type MatchEventType = "META" | "STRIKE";

export default function MatchAnalysisPage() {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const match = useAppStore((s) => s.matches.find((m) => m.id === id));

  const playerRef = useRef<YT.PlayerInstance | null>(null);
  const intervalRef = useRef<number | null>(null);
  const slowIntervalRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [showRegister, setShowRegister] = useState(false);

  const startProgressInterval = useCallback(() => {
    if (intervalRef.current || !playerRef.current) return;
    intervalRef.current = window.setInterval(() => {
      setCurrentTime(playerRef.current!.getCurrentTime());
    }, 500);
  }, []);

  const stopProgressInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const extractVideoId = useCallback((url: string) => {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
    const matchId = url.match(regex);
    return matchId ? matchId[1] : url;
  }, []);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      playerRef.current.playVideo();
      setPlaying(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
    setMuted(!muted);
  }, [muted]);

  const seek = useCallback(
    (delta: number) => {
      if (!playerRef.current) return;
      const t = Math.max(
        0,
        Math.min(duration, playerRef.current.getCurrentTime() + delta)
      );
      playerRef.current.seekTo(t, true);
      setCurrentTime(t);
    },
    [duration]
  );

  const changeSpeed = useCallback(() => {
    if (!playerRef.current) return;
    const speeds = [0.25, 0.5, 1, 1.5, 2];
    const idx = speeds.indexOf(playbackRate);
    const next = speeds[(idx + 1) % speeds.length];
    playerRef.current.setPlaybackRate(next);
    setPlaybackRate(next);
  }, [playbackRate]);

  const startSlowMotion = useCallback(() => {
    if (!playerRef.current || slowIntervalRef.current) return;
    slowIntervalRef.current = window.setInterval(() => {
      const t = playerRef.current!.getCurrentTime() + 0.1;
      playerRef.current!.seekTo(t, true);
      setCurrentTime(t);
    }, 100);
  }, []);

  const stopSlowMotion = useCallback(() => {
    if (slowIntervalRef.current) {
      clearInterval(slowIntervalRef.current);
      slowIntervalRef.current = null;
    }
  }, []);

  // --- Registrar evento ---
  const handleRegisterEvent = (type: MatchEventType) => {
    console.log("Evento registrado:", type, "en", currentTime, "s");
    setShowRegister(false);
  };

  const openRegister = useCallback(() => {
    if (playerRef.current && playerRef.current.getPlayerState() === YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    }
    setShowRegister(true);
  }, []);

  useEffect(() => {
    if (!match?.videoUrl) return;

    const videoId = extractVideoId(match.videoUrl);

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: { controls: 0, modestbranding: 1 },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            setDuration(event.target.getDuration());
            startProgressInterval();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.PLAYING) startProgressInterval();
            else stopProgressInterval();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) initPlayer();
    else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      stopProgressInterval();
      stopSlowMotion();
    };
  }, [match?.videoUrl, extractVideoId, startProgressInterval, stopProgressInterval, stopSlowMotion]);

  if (!match) {
    return (
      <div className="p-8 text-center text-gray-400 min-h-[60vh]">
        <h2 className="text-lg font-semibold text-white mb-2">Match not found</h2>
        <p>Looks like that match doesn’t exist or was removed.</p>
        <div className="mt-6">
          <Button onClick={() => router.push("/")}>Back to dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-white mb-6">{match.title}</h1>
      <div
        id="youtube-player"
        className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-lg mb-4"
      ></div>

      <div className="flex flex-wrap gap-3 mt-3 items-center">
        <Button onClick={togglePlay} className="flex items-center gap-1">
          {playing ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          {playing ? "Pause" : "Play"}
        </Button>
        <Button onClick={() => seek(-5)} className="flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" /> 5s
        </Button>
        <Button onClick={() => seek(5)} className="flex items-center gap-1">
          5s <ChevronRightIcon className="w-5 h-5" />
        </Button>
        <Button onClick={toggleMute} className="flex items-center gap-1">
          {muted ? <SpeakerXMarkIcon className="w-5 h-5" /> : <SpeakerWaveIcon className="w-5 h-5" />}
          {muted ? "Unmute" : "Mute"}
        </Button>
        <Button onClick={changeSpeed}>{playbackRate}x</Button>
        <Button
          onMouseDown={startSlowMotion}
          onMouseUp={stopSlowMotion}
          onMouseLeave={stopSlowMotion}
        >
          Slow
        </Button>
        <Button onClick={openRegister} className="flex items-center gap-1">
          <PlusIcon className="w-5 h-5" /> Register
        </Button>
        <div className="text-white ml-4">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </div>
      </div>

      {/* Modal de registro */}
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col gap-3">
            <h2 className="text-white font-semibold text-lg">Registrar Evento</h2>
            <p className="text-gray-300">Tiempo: {Math.floor(currentTime)}s</p>
            <div className="flex gap-3 mt-3">
              <Button onClick={() => handleRegisterEvent("META")}>Meta</Button>
              <Button onClick={() => handleRegisterEvent("STRIKE")}>Strike</Button>
              <Button onClick={() => setShowRegister(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
