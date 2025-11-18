import { useState, useRef, useCallback, useEffect } from "react";

export function useYouTubePlayer(videoUrl?: string) {
  const playerRef = useRef<YT.PlayerInstance | null>(null);
  const intervalRef = useRef<number | null>(null);
  const slowIntervalRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoReady, setVideoReady] = useState(false);

  const extractVideoId = useCallback((url: string) => {
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
    const matchId = url?.match(regex);
    return matchId ? matchId[1] : url;
  }, []);

  const safeAction = useCallback((action: () => void) => {
    if (!videoReady || !playerRef.current) return;
    action();
  }, [videoReady]);

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

  const togglePlay = useCallback(() => {
    safeAction(() => {
      const state = playerRef.current!.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        playerRef.current!.pauseVideo();
        setPlaying(false);
      } else {
        playerRef.current!.playVideo();
        setPlaying(true);
      }
    });
  }, [safeAction]);

  const toggleMute = useCallback(() => {
    safeAction(() => {
      if (muted) playerRef.current!.unMute();
      else playerRef.current!.mute();
      setMuted(!muted);
    });
  }, [muted, safeAction]);

  const seek = useCallback((delta: number) => {
    safeAction(() => {
      const t = Math.max(0, Math.min(duration, playerRef.current!.getCurrentTime() + delta));
      playerRef.current!.seekTo(t, true);
      setCurrentTime(t);
    });
  }, [duration, safeAction]);

  const goToEvent = useCallback((time: number) => {
    safeAction(() => {
      playerRef.current!.seekTo(time, true);
      setCurrentTime(time);
    });
  }, [safeAction]);

  const changeSpeed = useCallback(() => {
    safeAction(() => {
      const speeds = [0.25, 0.5, 1, 1.5, 2];
      const idx = speeds.indexOf(playbackRate);
      const next = speeds[(idx + 1) % speeds.length];
      playerRef.current!.setPlaybackRate(next);
      setPlaybackRate(next);
    });
  }, [playbackRate, safeAction]);

  const startSlowMotion = useCallback(() => {
    if (!videoReady || !playerRef.current || slowIntervalRef.current) return;
    slowIntervalRef.current = window.setInterval(() => {
      const t = playerRef.current!.getCurrentTime() + 0.1;
      playerRef.current!.seekTo(t, true);
      setCurrentTime(t);
    }, 100);
  }, [videoReady]);

  const stopSlowMotion = useCallback(() => {
    if (slowIntervalRef.current) {
      clearInterval(slowIntervalRef.current);
      slowIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!videoUrl) return;

    const videoId = extractVideoId(videoUrl);

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: { controls: 0, modestbranding: 1 },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            setDuration(event.target.getDuration());
            setVideoReady(true);
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
  }, [videoUrl, extractVideoId, startProgressInterval, stopProgressInterval, stopSlowMotion]);

  return {
    playerRef,
    playing,
    muted,
    currentTime,
    duration,
    playbackRate,
    videoReady,
    togglePlay,
    toggleMute,
    seek,
    goToEvent,
    changeSpeed,
    startSlowMotion,
    stopSlowMotion,
  };
}
