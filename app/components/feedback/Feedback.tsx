"use client";

const feedbacks = [
  {
    text: "Trabalho impecável! As fotos superaram todas as expectativas e ajudaram muito nas vendas.",
    name: "Maria Silva",
    role: "Diretora de Marketing",
  },
  {
    text: "Profissionalismo e criatividade em cada projeto. Recomendo fortemente!",
    name: "João Santos",
    role: "CEO, Brand Fashion",
  },
  {
    text: "Os vídeos trouxeram uma nova perspectiva para nossa marca. Resultado incrível!",
    name: "Ana Costa",
    role: "Proprietária, Studio Fitness",
  },
];

export default function Feedback() {
  return (
    <section className="bg-[#f6f1e9] px-6 py-40">
      {/* HEADER */}
      <div className="mb-24 text-center">
        <span className="tracking-[0.3em] text-xs text-gray-400">
          FEEDBACKS
        </span>
        <h2 className="mt-4 font-serif text-4xl text-gray-900">
          O que dizem
        </h2>
      </div>

      {/* FEEDBACKS */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3">
        {feedbacks.map((item, index) => (
          <div key={index} className="relative pl-6">
            {/* Linha vertical */}
            <span className="absolute left-0 top-1 h-24 w-[2px] bg-gray-900" />

            {/* Texto */}
            <p className="mb-8 text-sm italic leading-relaxed text-gray-500">
              “{item.text}”
            </p>

            <p className="text-sm font-medium text-gray-900">
              {item.name}
            </p>
            <span className="text-xs text-gray-500">
              {item.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
