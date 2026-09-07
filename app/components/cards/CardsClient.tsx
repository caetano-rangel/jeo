"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export interface CardItem {
  name: string;
  slug?: string;
  image: any;
  detalhes?: string;
}

interface CardsClientProps {
  tag?: string;
  titulo: string;
  descricao?: string;
  cards: CardItem[];
}

export default function CardsClient({
  tag,
  titulo,
  descricao,
  cards,
}: CardsClientProps) {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  // Animação/Destaque no mobile
  useEffect(() => {
    if (!cards.length) return;

    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <section className="relative bg-cream px-4 py-16 md:py-24 text-center overflow-hidden">
      {/* HEADER */}
      <div className="mb-12">
        {tag && (
          <span className="mb-4 block text-[10px] tracking-[0.4em] uppercase font-medium text-gold">
            {tag}
          </span>
        )}
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight">
          {titulo}
        </h2>
        {descricao && (
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#8a7a6a]">
            {descricao}
          </p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300" />
        </div>
      </div>

      {/* CARROSSEL DE BOLINHAS (CARDS) */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-start md:justify-center gap-6 overflow-x-auto py-4 px-3 scrollbar-none">
        {cards.map((card, idx) => {
          const imageUrl =
            card.image?.asset?.url || (card.image ? urlFor(card.image).url() : "");
          const isActiveMobile = idx === activeMobileIndex;

          // Monta a rota dinâmica do Next.js baseada no slug
          const route = card.slug
            ? card.slug.startsWith("/")
              ? card.slug
              : `/${card.slug}`
            : "#";

          return (
            <Link
              key={idx}
              href={route}
              className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
              aria-label={`Ver página da empresa ${card.name}`}
            >
              {/* Container da Imagem Redonda (Bolinha) */}
              <div
                className={`relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-gray-200 transition-all duration-500 ease-in-out group-hover:scale-105 group-active:scale-95 shadow-sm ${
                  isActiveMobile ? "scale-110 sm:scale-100 ring-2 ring-gold/50" : "scale-100"
                }`}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={card.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Nome do Projeto */}
              <span
                className={`mt-2 text-xs font-medium max-w-[96px] truncate transition-colors duration-200 group-hover:text-gold ${
                  isActiveMobile ? "text-gold font-semibold" : "text-gray-800"
                }`}
              >
                {card.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}