"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export interface VideoItem {
  label: string;
  videoUrl: string;
  aspectRatio?: "vertical" | "horizontal";
}

interface VideosClientProps {
  tag?: string;
  titulo: string;
  descricao?: string;
  videos: VideoItem[];
}

/* ─── MODAL ─────────────────────────────────────────────── */
function VideoModal({
  video,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  video: VideoItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const isVertical = video.aspectRatio !== "horizontal";

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, [video.videoUrl]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(14px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ width: isVertical ? "min(430px, 92vw)" : "min(750px, 92vw)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-between px-1">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "#6b6b6b" }}>
              0{index + 1} / 0{total}
            </p>
            <p className="font-serif text-lg text-white" style={{ fontFamily: "'Georgia', serif" }}>
              {video.label}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Video */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            height: isVertical ? "min(740px, 80vh)" : "min(420px, 70vh)",
            borderRadius: "20px",
            background: "#0a0a0a",
          }}
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            muted={muted}
            loop
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
            className="h-full w-full object-cover"
            onClick={togglePlay}
            style={{ cursor: "pointer" }}
          />

          {!playing && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ background: "rgba(0,0,0,0.25)" }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}
              >
                <svg width="20" height="20" viewBox="0 0 14 14" fill="white">
                  <path d="M3 2l10 5-10 5V2z" />
                </svg>
              </div>
            </div>
          )}

          {/* Controls */}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-4"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
          >
            {/* Scrubber */}
            <div
              className="h-1 w-full cursor-pointer rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.18)" }}
              onClick={handleScrub}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "#a1a1a1",
                  boxShadow: "0 0 6px rgba(255,255,255,0.3)",
                  transition: "width 0.2s linear",
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  {playing ? (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="white">
                      <rect x="2" y="1" width="4" height="12" rx="1" />
                      <rect x="8" y="1" width="4" height="12" rx="1" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="white">
                      <path d="M3 2l10 5-10 5V2z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() =>
                    setMuted((m) => {
                      const next = !m;
                      if (videoRef.current) videoRef.current.muted = next;
                      return next;
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  {muted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 010 14.14" /><path d="M15.54 8.46a5 5 0 010 7.07" />
                    </svg>
                  )}
                </button>

                <span className="text-[11px] tabular-nums" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {fmt(duration * (progress / 100))} / {fmt(duration)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full disabled:opacity-25"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" viewBox="0 0 14 14">
                    <path d="M9 2L4 7l5 5" />
                  </svg>
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full disabled:opacity-25"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" viewBox="0 0 14 14">
                    <path d="M5 2l5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? "20px" : "5px",
                height: "5px",
                background: i === index ? "#6b6b6b" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CARD ───────────────────────────────────────────────── */
function VideoCard({
  video,
  index,
  onClick,
}: {
  video: VideoItem;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const isVertical = video.aspectRatio !== "horizontal";

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative snap-center flex-shrink-0 cursor-pointer"
      style={{
        width: isVertical ? "clamp(230px, 80vw, 310px)" : "clamp(300px, 85vw, 420px)",
        height: isVertical ? "clamp(380px, 68vw, 500px)" : "clamp(220px, 50vw, 260px)",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#111",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "scale(1.02) translateY(-3px)" : "scale(1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
        style={{
          filter: hovered
            ? "brightness(0.75) saturate(1.1)"
            : "brightness(0.48) saturate(0.45)",
          transition: "filter 0.4s ease",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
        }}
      />

      <span
        className="absolute top-4 left-4 font-mono text-[10px] tracking-widest"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        0{index + 1}
      </span>

      <span
        className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
          color: hovered ? "#e5e5e5" : "rgba(255,255,255,0.5)",
        }}
      >
        {video.label}
      </span>

      {/* Play button centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.18)",
            transform: hovered ? "scale(1.12)" : "scale(1)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 14 14" fill="white">
            <path d="M3 2l10 5-10 5V2z" />
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-5 left-5 right-5">
        <p
          className="font-serif text-lg text-white leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {video.label}
        </p>
        <p
          className="mt-1 text-[10px] uppercase tracking-widest transition-all duration-300"
          style={{ color: hovered ? "#b8b8b8" : "rgba(255,255,255,0.35)" }}
        >
          {hovered ? "Clique para assistir" : "Social Media"}
        </p>
      </div>
    </div>
  );
}

/* ─── SECTION CLIENT ─────────────────────────────────────── */
export default function VideosClient({
  tag,
  titulo,
  descricao,
  videos,
}: VideosClientProps) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => setModalIndex(index), []);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const prev = useCallback(
    () => setModalIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const next = useCallback(
    () => setModalIndex((i) => (i !== null && i < videos.length - 1 ? i + 1 : i)),
    [videos.length]
  );

  return (
    <section
      className="relative px-6 py-24 text-center overflow-hidden"
      style={{ background: "#ececec" }}
    >
      {/* HEADER */}
      <div className="mb-16">
        {tag && (
          <span
            className="mb-4 block text-[10px] tracking-[0.4em] uppercase font-medium"
            style={{ color: "#6b6b6b" }}
          >
            {tag}
          </span>
        )}
        <h2
          className="font-serif text-3xl md:text-4xl text-gray-900"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
        >
          {titulo}
        </h2>
        {descricao && (
          <p
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed"
            style={{ color: "#757575" }}
          >
            {descricao}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300" />
        </div>
      </div>

      {/* CARDS */}
      <div
        className="
          flex gap-5
          overflow-x-auto snap-x snap-mandatory pb-4
          md:justify-center md:overflow-visible md:flex-wrap items-center
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            index={index}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="mt-10 flex justify-center gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => openModal(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: "6px", height: "6px", background: "#b8b8b8" }}
            aria-label={`Abrir ${videos[i].label}`}
          />
        ))}
      </div>

      <p className="mt-4 text-xs tracking-widest" style={{ color: "#9a9a9a" }}>
        {String(videos.length).padStart(2, "0")} vídeos
      </p>

      {/* MODAL */}
      {modalIndex !== null && (
        <VideoModal
          video={videos[modalIndex]}
          index={modalIndex}
          total={videos.length}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
          hasPrev={modalIndex > 0}
          hasNext={modalIndex < videos.length - 1}
        />
      )}
    </section>
  );
}