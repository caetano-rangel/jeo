import { Mouse } from "lucide-react";

import Sobre from "./components/perfil/Sobre";
import Cards from "./components/cards/Cards";
import Videos from "./components/carousel/Videos";
import Redes from "./components/redes/Redes";
import Feedback from "./components/feedback/Feedback";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-dvh w-full overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[left_center] md:bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <span className="mb-4 block text-[10px] tracking-[0.35em] uppercase text-gray-200">
              Fotografia & Vídeo
            </span>

            <h1 className="mb-6 font-serif text-4xl leading-tight text-gray-200 sm:text-5xl md:text-7xl">
              Transformando
              <br />
              Momentos em Arte
            </h1>

            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-200">
              Especializado em social media, marketing imobiliário, produções
              audiovisuais e filmes de casamento.
            </p>

            <a
              href="https://wa.me/5591980486792?text=Olá!%20Gostaria%20de%20fazer%20um%20orçamento."
              target="_blank"
              className="inline-block border border-white px-8 py-3 text-[11px] tracking-widest text-gray-200 transition hover:bg-white hover:text-black"
            >
              ENTRE EM CONTATO
            </a>

            {/* ÍCONE DE SCROLL */}
            <div className="mt-8 flex justify-center">
              <Mouse className="h-6 w-6 text-white/80 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÕES */}
      <Sobre />
      <Cards />
      <Videos />
      <Redes />
      <Feedback />
      <Footer />
    </main>
  );
}
