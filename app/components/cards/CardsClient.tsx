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

      {/* CARROSSEL DE HIGHLIGHTS */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-start md:justify-center gap-6 overflow-x-auto pb-6 px-2 scrollbar-none">
        {cards.map((card, idx) => {
          const imageUrl =
            card.image?.asset?.url || (card.image ? urlFor(card.image).url() : "");

          return (
            <button
              key={idx}
              onClick={() => setSelectedCard(card)}
              className="group flex flex-col items-center flex-shrink-0 cursor-pointer focus:outline-none"
              aria-label={`Ver projeto ${card.name}`}
            >
              {/* Container da Imagem Redonda Sem Borda */}
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full bg-gray-200 transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shadow-sm">
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
              <span className="mt-2 text-xs font-medium text-gray-800 max-w-[88px] truncate transition-colors duration-200 group-hover:text-gold">
                {card.name}
              </span>
            </button>
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

            {/* Imagem em destaque dentro do modal */}
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