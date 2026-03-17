"use client";

import { useRef, useState } from "react";
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(pct);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  // Check if it's a YouTube/Vimeo embed URL
  const isEmbed =
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("vimeo.com");

  if (isEmbed) {
    let embedUrl = url;
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
    } else if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
    }

    return (
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
        <iframe
          src={embedUrl}
          title={title || "Video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group">
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
        muted={muted}
      />

      {/* Controls overlay */}
      <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress bar */}
        <div
          className="h-1 bg-white/20 cursor-pointer mx-4 mb-2 rounded-full"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls bar */}
        <div className="flex items-center gap-3 px-4 pb-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-primary transition-colors"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className="text-white hover:text-primary transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1" />

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Play button overlay when paused */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play video"
        >
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
            <Play className="w-7 h-7 text-white ml-1" />
          </div>
        </button>
      )}
    </div>
  );
}
