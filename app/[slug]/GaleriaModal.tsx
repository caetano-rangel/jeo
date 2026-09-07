"use client";

import { useState } from "react";
import Image from "next/image";

interface GaleriaModalProps {
  fotos: { url: string; key: string }[];
  nomeEmpresa: string;
}

export default function GaleriaModal({ fotos, nomeEmpresa }: GaleriaModalProps) {
  const [imagemModal, setImagemModal] = useState<string | null>(null);

  return (
    <>
      {/* Grade com miniaturas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {fotos.map((foto, index) => (
          <div
            key={foto.key || index}
            onClick={() => setImagemModal(foto.url)}
            className="group relative h-40 sm:h-48 rounded-xl overflow-hidden bg-gray-200 border border-gray-300/60 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
          >
            <Image
              src={foto.url}
              alt={`Foto ${index + 1} - ${nomeEmpresa}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-[10px] uppercase tracking-widest font-medium bg-black/60 px-2.5 py-1 rounded-full">
                Ampliar
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL COM BORDAS ARREDONDADAS APENAS NA IMAGEM */}
      {imagemModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setImagemModal(null)}
        >
          <div
            className="relative max-w-4xl w-auto max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setImagemModal(null)}
              className="absolute -top-8 right-0 text-white/80 hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              ✕ Fechar
            </button>

            {/* Imagem direta com cantos arredondados (sem moldura de fundo) */}
            <img
              src={imagemModal}
              alt="Foto ampliada"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}