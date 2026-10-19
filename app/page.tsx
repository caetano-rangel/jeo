import { Mouse } from "lucide-react";
import Image from "next/image";

import Sobre from "./components/perfil/Sobre";
import Cards from "./components/cards/Cards";
import Videos from "./components/carousel/Videos";
import Redes from "./components/redes/Redes";
import Feedback from "./components/feedback/Feedback";
import Footer from "./components/footer/Footer";
import Qrcode from "./components/qrcode/Qrcode";
import Banana from "./components/banana/Banana"

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* BACKGROUND MOBILE (Preenche 100% e alinha o foco no lado DIREITO da foto) */}
        <div className="absolute inset-0 block md:hidden">
          <Image
            src="/back.jpeg"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-[26%_center]"
          />
        </div>

        {/* BACKGROUND DESKTOP (Mantém o estilo do computador) */}
        <div
          className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-position-[left_center] bg-fixed"
          style={{ backgroundImage: "url('/back.jpeg')" }}
        />

        {/* Overlay em gradiente */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/55 z-0" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-xl text-center animate-fade-in-up">
            <span className="mb-4 block text-[10px] tracking-[0.35em] uppercase text-gray-400">
              Fotografia & Vídeo
            </span>

            <h1 className="mb-6 font-serif text-4xl leading-tight text-gray-300 sm:text-5xl md:text-7xl">
              Comunicação que traduz
              
              ideias em presença!
            </h1>

            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-300">
              Estratégia, conteúdo, audiovisual para marcas e projetos!
            </p>

            <a
              href="https://wa.me/5591980486792?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-gray/80 px-8 py-3 text-[11px] tracking-widest text-gray-300 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-ink"
            >
              ENTRE EM CONTATO
            </a>

            {/* ÍCONE DE SCROLL */}
            <div className="mt-8 flex justify-center">
              <Mouse className="h-6 w-6 text-gray-300 animate-bounce" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÕES */}
      <Sobre />
      <Cards />
      <Banana />
      <Videos />
      <Redes />
      <Feedback />
      <Qrcode />
      <Footer />
    </main>
  );
}