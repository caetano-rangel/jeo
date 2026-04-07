"use client";

import React from 'react';

// Dados dos feedbacks (Podem vir de uma API no futuro)
const feedbacks = [
  {
    text: "Trabalho impecável! As fotos superaram todas as expectativas e ajudaram muito nas vendas do nosso último lançamento.",
    name: "Maria Silva",
    role: "Diretora de Marketing",
  },
  {
    text: "Profissionalismo e criatividade em cada projeto. A entrega final foi muito além do que havíamos imaginado. Recomendo fortemente!",
    name: "João Santos",
    role: "CEO, Brand Fashion",
  },
  {
    text: "Os vídeos trouxeram uma nova perspectiva para nossa marca. O resultado final ficou incrível e engajou muito nosso público.",
    name: "Ana Costa",
    role: "Proprietária, Studio Fitness",
  },
];

export default function Feedback() {
  return (
    <section className="bg-[#f6f1e9] px-6 py-28 md:py-36">
      
      {/* HEADER IDÊNTICO AO ESTILO DA FOTO */}
      <div className="mb-20 text-center">
        <div className="mb-4 flex items-center justify-center gap-2.5 text-[10px] font-medium tracking-[0.4em] uppercase text-[#c9a86a]">
          <span>✦</span>
          <span>Conteúdo que Conecta</span>
          <span>✦</span>
        </div>

        <h2 className="mb-6 font-serif text-4xl text-[#1a1a1a] md:text-6xl italic leading-tight">
          O que dizem
        </h2>

        {/* Linha decorativa suave (como na foto) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300" />
        </div>
      </div>

      {/* LISTA DE FEEDBACKS REFATORADA */}
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 lg:gap-16">
        {feedbacks.map((item, index) => (
          <div key={index} className="relative flex flex-col gap-6 w-full sm:max-w-md lg:max-w-sm">
            {/* Ícone de aspas/diamante decorativo no depoimento */}
            <div className="text-2xl text-[#c9a86a]">"</div>

            {/* Texto do depoimento */}
            <p className="font-sans text-sm md:text-base leading-relaxed text-gray-700">
              “{item.text}”
            </p>

            {/* Identificação do Cliente */}
            <div className="mt-auto flex items-center gap-4">
              {/* Linha vertical (mudada para dourado) */}
              <div className="h-10 w-[1.5px] bg-[#c9a86a]" />
              
              <div className="flex flex-col">
                <p className="text-sm font-semibold tracking-wide text-[#1a1a1a]">
                  {item.name}
                </p>
                <span className="text-xs tracking-wide text-gray-500">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}