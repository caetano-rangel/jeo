"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export interface CardItem {
  name: string;
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  // Trava o scroll do fundo quando o modal estiver aberto
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCard]);

  // Fechar modal com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative bg-cream px-6 py-24 text-center overflow-hidden">
      {/* HEADER */}
      <div className="mb-16">
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

      {/* CARROSSEL EXPANSÍVEL (ACCORDION HOVER) */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:gap-3 h-[500px]">
        {cards.map((card, idx) => {
          const imageUrl =
            card.image?.asset?.url || (card.image ? urlFor(card.image).url() : "");

          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalhes do projeto ${card.name}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(idx)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => setSelectedCard(card)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCard(card);
                }
              }}
              className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out"
              style={{
                flex: isHovered ? 3.5 : 1,
              }}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={card.name}
                  fill
                  className={`object-cover transition-all duration-700 ease-out ${
                    isHovered ? "grayscale-0 scale-105" : "grayscale scale-100"
                  }`}
                />
              )}

              {/* Overlay Escuro para Contraste */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"
                style={{ opacity: isHovered ? 0.85 : 0.6 }}
              />

              {/* Informações no Card */}
              <div className="absolute bottom-6 left-6 right-6 text-left transition-all duration-300">
                <p className="font-serif text-lg text-white font-medium whitespace-nowrap">
                  {card.name}
                </p>
                <p
                  className={`mt-1 text-[10px] uppercase tracking-widest transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 translate-y-0 text-gold"
                      : "opacity-0 translate-y-2 text-white/70"
                  }`}
                >
                  Ver detalhes do projeto ✦
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL / TELA SOBREPOSTA */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#121212] p-6 md:p-8 text-left shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedCard(null)}
              aria-label="Fechar detalhes do projeto"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              ✕
            </button>

            {/* Imagem em destaque dentro do modal (em cores normais) */}
            {selectedCard.image && (
              <div className="relative mb-6 h-52 w-full overflow-hidden rounded-xl">
                <Image
                  src={
                    selectedCard.image?.asset?.url ||
                    urlFor(selectedCard.image).url()
                  }
                  alt={selectedCard.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Nome da empresa */}
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Projeto / Cliente
            </span>
            <h3 className="mt-1 font-serif text-2xl text-white">
              {selectedCard.name}
            </h3>

            {/* Descrição do que foi trabalhado */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                O que foi trabalhado:
              </h4>
              <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                {selectedCard.detalhes ||
                  "Nenhum detalhe informado para este projeto."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}