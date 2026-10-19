"use client";

import { Mouse } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HeroClientProps {
  tag?: string;
  titulo: string;
  descricao?: string;
  backgroundImage?: any;
  buttonText?: string;
  whatsappUrl?: string;
}

export default function HeroClient({
  tag,
  titulo,
  descricao,
  backgroundImage,
  buttonText,
  whatsappUrl,
}: HeroClientProps) {
  // Gera a URL da imagem do Sanity ou usa a padrão local
  const bgImageUrl = backgroundImage
    ? urlFor(backgroundImage).url()
    : "/back.jpeg";

  const defaultWhatsapp =
    "https://wa.me/5591980486792?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento.";

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* BACKGROUND MOBILE */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src={bgImageUrl}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-[26%_center]"
        />
      </div>

      {/* BACKGROUND DESKTOP */}
      <div
        className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-position-[left_center] bg-fixed"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      />

      {/* Overlay em gradiente */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/55 z-0" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-xl text-center animate-fade-in-up">
          {tag && (
            <span className="mb-4 block text-[10px] tracking-[0.35em] uppercase text-gray-400">
              {tag}
            </span>
          )}

          <h1 className="mb-6 font-serif text-4xl leading-tight text-gray-300 sm:text-5xl md:text-7xl whitespace-pre-line">
            {titulo}
          </h1>

          {descricao && (
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-300">
              {descricao}
            </p>
          )}

          <a
            href={whatsappUrl || defaultWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-gray/80 px-8 py-3 text-[11px] tracking-widest text-gray-300 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-ink"
          >
            {buttonText || "ENTRE EM CONTATO"}
          </a>

          {/* ÍCONE DE SCROLL */}
          <div className="mt-8 flex justify-center">
            <Mouse className="h-6 w-6 text-gray-300 animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}