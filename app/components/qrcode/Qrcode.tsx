"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Qrcode() {
  const [copied, setCopied] = useState(false);

  // Altere para a URL real do seu site
  const siteUrl = "https://seusite.com.br";

  // Caminho da sua imagem salva na pasta /public
  const qrCodeImagePath = "/qrcode.png";

  const handleDownload = async () => {
    try {
      const response = await fetch(qrCodeImagePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode-portfolio.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar o QR Code:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative bg-[#f6f1e9] px-6 py-24 text-center border-t border-black/5 overflow-hidden">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        
        {/* HEADER ELEGANTE */}
        <div className="mb-6 flex items-center justify-center gap-2.5 text-[10px] font-medium tracking-[0.4em] uppercase text-[#c9a86a]">
          <span>✦</span>
          <span>Acesso Instantâneo</span>
          <span>✦</span>
        </div>

        <h2 className="mb-14 font-serif text-3xl md:text-5xl text-[#1a1a1a] italic leading-tight">
          Conecte-se em qualquer lugar
        </h2>


        {/* CARTÃO BADGE HORIZONTAL / VERTICAL (ESTILO DIPLOMA / PASSAPORTE) */}
        <div className="relative w-full max-w-md bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-[#c9a86a]/30 shadow-2xl shadow-[#c9a86a]/10 flex flex-col items-center transition-all duration-500 hover:shadow-3xl hover:border-[#c9a86a]/50">
          
          {/* Detalhe de Tag no Topo do Card */}
          <div className="absolute -top-3 px-4 py-1 bg-[#1a1a1a] rounded-full text-[9px] uppercase tracking-[0.3em] text-[#c9a86a] font-medium">
            Portfólio Digital
          </div>

          {/* ÁREA CENTRAL DO QR CODE COM MOLDURA DOURADA DUPLA */}
          <div className="relative mt-2 mb-6 p-3 bg-white rounded-2xl border border-gray-100 shadow-inner">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-xl overflow-hidden">
              <Image
                src={qrCodeImagePath}
                alt="QR Code do Portfólio"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* TEXTO DE INSTRUÇÃO E LINK */}
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-widest text-[#c9a86a] font-semibold">
              Escanear com a câmera
            </p>
            <p className="mt-1 text-[11px] text-gray-400 font-mono">
              {siteUrl.replace("https://", "")}
            </p>
          </div>

          {/* BOTÕES DE AÇÃO INTEGRADOS NO CARD */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-xl bg-[#1a1a1a] text-white text-[11px] font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#c9a86a] flex items-center justify-center gap-2"
            >
              <span>Baixar</span>
              <span className="text-xs">↓</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex-1 py-3 rounded-xl border border-black/10 bg-white/80 text-[#1a1a1a] text-[11px] font-medium tracking-widest uppercase transition-all duration-300 hover:border-[#c9a86a] hover:text-[#c9a86a]"
            >
              {copied ? "Copiado! ✦" : "Copiar Link"}
            </button>
          </div>

        </div>

        {/* DIVISOR DE RODAPÉ */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300" />
        </div>

      </div>
    </section>
  );
}