"use client";

import { useRef, useCallback, useEffect } from "react";
import { useAnalytics } from "./AnalyticsProvider";

/**
 * Custom hook for tracking video engagement.
 *
 * Usage:
 * ```tsx
 * function VideoPlayer({ videoId, title, src }: Props) {
 *   const { videoRef, handlePlay, handleTimeUpdate, handleEnded } = useVideoTracking(videoId, title);
 *
 *   return (
 *     <video
 *       ref={videoRef}
 *       src={src}
 *       onPlay={handlePlay}
 *       onTimeUpdate={handleTimeUpdate}
 *       onEnded={handleEnded}
 *     />
 *   );
 * }
 * ```
 *
 * Or for custom video players (YouTube, Vimeo embeds):
 * ```tsx
 * function YouTubePlayer({ videoId, title }: Props) {
 *   const { trackPlay, trackProgress, trackComplete } = useVideoTracking(videoId, title);
 *
 *   // Call these methods from your player's event handlers
 *   useEffect(() => {
 *     player.on('play', () => trackPlay(player.getDuration()));
 *     player.on('timeupdate', () => trackProgress(player.getCurrentTime(), player.getDuration()));
 *     player.on('ended', () => trackComplete(player.getDuration(), player.getCurrentTime()));
 *   }, []);
 * }
 * ```
 */
export function useVideoTracking(videoId: string, videoTitle: string) {
  const { useVideoTracking: getVideoHooks } = useAnalytics();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playStartTimeRef = useRef<number>(0);
  const totalWatchTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  // Get the tracking methods from context
  const { onPlay, onProgress, onComplete } = getVideoHooks(videoId, videoTitle);

  // Track play start
  const trackPlay = useCallback((duration: number) => {
    playStartTimeRef.current = Date.now();
    isPlayingRef.current = true;
    onPlay(duration);
  }, [onPlay]);

  // Track progress (call this on timeupdate)
  const trackProgress = useCallback((currentTime: number, duration: number) => {
    onProgress(currentTime, duration);
  }, [onProgress]);

  // Track complete
  const trackComplete = useCallback((duration: number, actualWatchTime?: number) => {
    // Calculate watch time if not provided
    const watchTime = actualWatchTime ?? (
      isPlayingRef.current
        ? totalWatchTimeRef.current + (Date.now() - playStartTimeRef.current) / 1000
        : totalWatchTimeRef.current
    );
    isPlayingRef.current = false;
    onComplete(duration, watchTime);
  }, [onComplete]);

  // Native HTML5 video event handlers
  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      trackPlay(videoRef.current.duration);
    }
  }, [trackPlay]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      trackProgress(videoRef.current.currentTime, videoRef.current.duration);
    }
  }, [trackProgress]);

  const handleEnded = useCallback(() => {
    if (videoRef.current) {
      trackComplete(videoRef.current.duration, videoRef.current.currentTime);
    }
  }, [trackComplete]);

  const handlePause = useCallback(() => {
    if (isPlayingRef.current) {
      // Accumulate watch time when paused
      totalWatchTimeRef.current += (Date.now() - playStartTimeRef.current) / 1000;
      isPlayingRef.current = false;
    }
  }, []);

  // Clean up on unmount - reset refs
  // Note: We can't reliably track video abandon on unmount since sendBeacon may not work
  // The milestone tracking (video_progress) already captures engagement at 25%, 50%, 75%, 90%
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      totalWatchTimeRef.current = 0;
      playStartTimeRef.current = 0;
    };
  }, []);

  return {
    // For native HTML5 video elements
    videoRef,
    handlePlay,
    handleTimeUpdate,
    handleEnded,
    handlePause,
    // For custom/third-party video players
    trackPlay,
    trackProgress,
    trackComplete,
  };
}
