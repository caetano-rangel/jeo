"use client";

import { useState, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface VideoItem {
  _key: string;
  tituloProjeto?: string;
  cliente?: string;
  categoria?: string;
  videoUrl: string;
  thumb?: any;
}

interface BananaData {
  tag?: string;
  titulo?: string;
  descricao?: string;
  videosList: VideoItem[];
}

export default function Banana() {
  const [data, setData] = useState<BananaData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const fetchBananaData = async () => {
      const query = `*[_type == "bananaWeddingSection"][0] {
        tag,
        titulo,
        descricao,
        videosList[] {
          _key,
          tituloProjeto,
          cliente,
          categoria,
          thumb,
          "videoUrl": coalesce(videoFile.asset->url, externalVideoUrl)
        }
      }`;
      const res = await client.fetch(query);
      if (res) setData(res);
    };

    fetchBananaData();
  }, []);

  const videos = data?.videosList || [];

  const handlePrev = () => {
    if (!videos.length) return;
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!videos.length) return;
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (activeModalVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalVideo]);

  if (!data || !videos.length) {
    return null;
  }

  return (
    <section className="relative bg-[#0a0a0a] text-white px-4 py-24 overflow-hidden border-t border-white/10">
      {/* BANNER DE FUNDO */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -inset-y-32 -inset-x-20 sm:-inset-x-32"
          style={{
            transform: "rotate(-8deg) scale(1.3)",
          }}
        >
          <Image
            src="/portraits/banner.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-[#0a0a0a]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* HEADER */}
        <div className="mb-12">
          {data.tag && (
            <span className="mb-3 inline-block text-[10px] tracking-[0.4em] uppercase font-medium text-gold">
              {data.tag}
            </span>
          )}

          {data.titulo && (
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {data.titulo}
            </h2>
          )}

          {data.descricao && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
              {data.descricao}
            </p>
          )}
        </div>

        {/* CARROSSEL DE VÍDEOS */}
        <div className="relative mx-auto my-12 flex h-[380px] sm:h-[440px] max-w-5xl items-center justify-center">
          {videos.map((video, idx) => {
            const imageUrl = video.thumb ? urlFor(video.thumb).url() : null;

            const total = videos.length;
            let offset = (idx - currentIndex + total) % total;
            if (offset > total / 2) offset -= total;

            const isCenter = offset === 0;
            const isLeft = offset === -1 || (currentIndex === 0 && idx === total - 1);
            const isRight = offset === 1 || (currentIndex === total - 1 && idx === 0);

            if (!isCenter && !isLeft && !isRight) {
              return null;
            }

            return (
              <div
                key={video._key || idx}
                onClick={() => {
                  if (isCenter) setActiveModalVideo(video);
                  else if (isLeft) handlePrev();
                  else if (isRight) handleNext();
                }}
                className={`absolute transition-all duration-700 ease-out cursor-pointer select-none rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl ${
                  isCenter
                    ? "z-30 w-[85%] sm:w-[550px] h-[340px] sm:h-[400px] scale-100 opacity-100 border-gold/50 shadow-gold/10"
                    : "z-10 w-[70%] sm:w-[420px] h-[280px] sm:h-[320px] scale-90 opacity-40 blur-[1px] hover:opacity-60"
                }`}
                style={{
                  transform: `translateX(${
                    isCenter ? "0%" : isLeft ? "-45%" : "45%"
                  }) scale(${isCenter ? 1 : 0.88})`,
                }}
              >
                <div className="relative h-full w-full bg-black/50">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={video.tituloProjeto || "Vídeo"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    video.videoUrl && (
                      <video
                        src={video.videoUrl}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                      />
                    )
                  )}

                  {/* Gradiente escuro sutil no fundo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Ícone de Play central */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:text-black">
                        <Play className="h-6 w-6 fill-current ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-gold hover:text-black hover:border-gold"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-gold hover:text-black hover:border-gold"
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* MODAL PLAYER */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-[#121212] overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-gold hover:text-black"
              aria-label="Fechar vídeo"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeModalVideo.videoUrl}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}