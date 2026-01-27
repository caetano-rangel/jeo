"use client";

import { useRef, useState } from "react";

const videos = [
  { src: "/videos/casamento.mp4", label: "Lifestyle" },
  { src: "/videos/casamento.mp4", label: "Gastronômico" },
  { src: "/videos/casamento.mp4", label: "Marca Pessoal" },
  { src: "/videos/casamento.mp4", label: "Imobiliário" },
  { src: "/videos/casamento.mp4", label: "Eventos" },
  { src: "/videos/casamento.mp4", label: "Institucional" },
];

export default function Videos() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    const current = videoRefs.current[index];
    if (!current) return;

    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (activeVideo === index) {
      current.pause();
      current.currentTime = 0;
      setActiveVideo(null);
    } else {
      current.play();
      setActiveVideo(index);
    }
  };

  return (
    <section className="bg-[#f6f1e9] px-6 py-24 text-center overflow-hidden">
      {/* HEADER */}
      <span className="mb-4 block text-xs tracking-[0.3em] uppercase text-[#c9a86a]">
        Conteúdo que conecta
      </span>

      <h2 className="mb-6 font-serif text-4xl text-gray-900">
        Social Media
      </h2>

      <p className="mx-auto mb-16 max-w-2xl text-sm leading-relaxed text-gray-600">
        Criação de conteúdo visual estratégico para redes sociais.
      </p>

      {/* MOBILE → CARROSSEL | DESKTOP → GRID 2x3 */}
      <div
        className="
          flex
          gap-6
          overflow-x-auto
          snap-x
          snap-mandatory
          pb-2

          scrollbar-hide
          [-ms-overflow-style:none]
          [scrollbar-width:none]

          md:grid
          md:grid-cols-3
          md:grid-rows-2
          md:gap-10
          md:overflow-visible
        "
      >
        {videos.map((video, index) => {
          const isActive = activeVideo === index;

          return (
            <div
              key={index}
              className={`
                relative
                snap-center
                w-[85%]
                sm:w-[70%]
                h-[200px]
                sm:h-[220px]

                md:w-full
                md:h-[260px]

                flex-shrink-0
                overflow-hidden
                rounded-2xl
                bg-black
                transition-all
                duration-500
                ease-out

                ${
                  isActive
                    ? "scale-[1.05] z-20 shadow-2xl"
                    : "scale-95"
                }
              `}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                className={`
                  h-full
                  w-full
                  object-cover
                  transition-all
                  duration-500
                  ${
                    isActive
                      ? "grayscale-0 brightness-100"
                      : "brightness-50"
                  }
                `}
              />

              {/* OVERLAY MAIS ESCURO */}
              {!isActive && (
                <div className="absolute inset-0 bg-black/50" />
              )}

              {/* PLAY BUTTON */}
              <button
                onClick={() => togglePlay(index)}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                {!isActive && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur transition hover:scale-105">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-6 w-6 translate-x-[1px]"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </button>

              {/* LABEL */}
              <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-1 text-xs text-white backdrop-blur">
                {video.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
