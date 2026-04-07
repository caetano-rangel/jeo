"use client";

import { useState } from "react";

export default function Cards() {
  const [active, setActive] = useState<number>(0);

  const cards = [
    { image: "/portraits/ufsb.jpeg", name: "Ufsb" },
    { image: "/portraits/banana.jpeg", name: "Banana Webfilms" },
    { image: "/portraits/ansuba.jpeg", name: "Ansuba" },
    { image: "/portraits/remax.jpg", name: "RE/MAX" },
    { image: "/portraits/maria.jpg", name: "Maria Bahia" },
    { image: "/portraits/pitinga.PNG", name: "Residencial Pitinga" },
  ];

  return (
    <section className="bg-[#f6f1e9] px-6 py-24">
      {/* TÍTULO */}
      <div className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a86a]">
          <span>✦</span>
          <span>CREATIVE WORK</span>
          <span>✦</span>
        </div>

        <h2 className="mb-4 font-serif text-4xl text-[#1a1a1a] md:text-5xl lg:text-6xl ">
          Portfólio
        </h2>

        <p className="mx-auto max-w-lg text-sm tracking-wide text-gray-500 md:text-base">
          Clientes e empresas que já confiam no meu trabalho estratégico.
        </p>
        
        {/* Linha decorativa suave opcional (como na foto) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300" />
        </div>
      </div>

      {/* CARDS */}
      <div
        className="
          flex
          items-end
          gap-6
          px-4

          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          touch-pan-x

          scrollbar-hide
          [-ms-overflow-style:none]
          [scrollbar-width:none]

          md:justify-center
          md:overflow-visible
        "
      >
        {cards.map((card, index) => {
          const isActive = active === index;
          const isLeft = index < active;
          const isRight = index > active;

          return (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`
                relative
                snap-center
                h-[410px]
                rounded-3xl
                overflow-hidden
                flex-shrink-0
                transition-all
                duration-300
                ease-out

                ${
                  isActive
                    ? "w-[78vw] sm:w-[55vw] md:w-[310px] z-20"
                    : "w-[65vw] sm:w-[48vw] md:w-[180px]"
                }

                ${isLeft ? "md:-translate-x-3" : ""}
                ${isRight ? "md:translate-x-3" : ""}
              `}
            >
              {/* IMAGEM */}
              <img
                src={card.image}
                alt={card.name}
                className={`
                  h-full
                  w-full
                  object-cover
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "grayscale-0 brightness-90 saturate-125 contrast-110"
                      : "grayscale brightness-60 saturate-50"
                  }
                `}
              />

              {/* OVERLAY */}
              <div
                className={`
                  absolute
                  inset-0
                  flex
                  items-end
                  p-6
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-black/20 opacity-100"
                      : "bg-black/40 opacity-100 md:opacity-0 md:hover:opacity-100"
                  }
                `}
              >
                <span className="font-serif text-lg text-white">
                  {card.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
