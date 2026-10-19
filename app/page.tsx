import { Mouse } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Ajuste o caminho do seu client
import { urlFor } from "@/sanity/lib/image";   // Ajuste o caminho do seu urlFor

import Sobre from "./components/perfil/Sobre";
import Cards from "./components/cards/Cards";
import Videos from "./components/carousel/Videos";
import Redes from "./components/redes/Redes";
import Feedback from "./components/feedback/Feedback";
import Footer from "./components/footer/Footer";
import Qrcode from "./components/qrcode/Qrcode";
import Banana from "./components/banana/Banana";

async function getHeroData() {
  const query = `*[_type == "heroSection"][0]`;
  return await client.fetch(query);
}

export default async function Home() {
  const hero = await getHeroData();

  // Valores padrão de fallback
  const tag = hero?.tag || "Imagem & Narrativa";
  const titulo = hero?.titulo || "Comunicação que traduz\nideias em presença!";
  const descricao = hero?.descricao || "Estratégia, conteúdo, audiovisual para marcas e projetos!";
  const buttonText = hero?.buttonText || "ENTRE EM CONTATO";
  const whatsappUrl = hero?.whatsappUrl || "https://wa.me/5591980486792?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento.";
  const bgImageUrl = hero?.backgroundImage ? urlFor(hero.backgroundImage).url() : "/back.jpeg";

  return (
    <main className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* BACKGROUND MOBILE */}
        <div className="absolute inset-0 block md:hidden">
          <Image
            src={bgImageUrl}
            alt="Hero Background"
            fill
            priority
            className="object-cover object-[26%_center]"
          />
        </div>

        {/* BACKGROUND DESKTOP */}
        <div
          className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-position-[left_center] bg-fixed"
          style={{ backgroundImage: `url('${bgImageUrl}')` }}
        />

        {/* Overlay em gradiente */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/55 z-0" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-xl text-center animate-fade-in-up">
            <span className="mb-4 block text-[10px] tracking-[0.35em] uppercase text-gray-400">
              {tag}
            </span>

            <h1 className="mb-6 font-serif text-4xl leading-tight text-gray-300 sm:text-5xl md:text-7xl whitespace-pre-line">
              {titulo}
            </h1>

            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-300">
              {descricao}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-gray/80 px-8 py-3 text-[11px] tracking-widest text-gray-300 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-ink"
            >
              {buttonText}
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