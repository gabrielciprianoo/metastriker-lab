
export {};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: YT;
  }

  namespace YT {
    interface PlayerInstance {
      playVideo(): void;
      pauseVideo(): void;
      getCurrentTime(): number;
      seekTo(seconds: number, allowSeekAhead?: boolean): void;
      getDuration(): number;
      getPlayerState(): number;
      mute(): void;
      unMute(): void;
      setPlaybackRate(rate: number): void;
      // optional: getPlaybackRate?
      getPlaybackRate?(): number;
    }

    enum PlayerState {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5,
    }

    interface PlayerEvent {
      target: PlayerInstance;
    }

    interface OnStateChangeEvent {
      data: PlayerState;
      target: PlayerInstance;
    }

    interface PlayerOptions {
      videoId: string;
      playerVars?: Record<string, unknown>;
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
      };
    }

    class Player {
      constructor(elementId: string, options: PlayerOptions);
      playVideo(): void;
      pauseVideo(): void;
      getCurrentTime(): number;
      seekTo(seconds: number, allowSeekAhead?: boolean): void;
      getDuration(): number;
      getPlayerState(): number;
      mute(): void;
      unMute(): void;
      setPlaybackRate(rate: number): void;
    }
  }
}
