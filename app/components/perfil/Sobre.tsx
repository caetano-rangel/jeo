export default function Sobre() {
  return (
    <section className="bg-[#f6f1e9] px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        
        <div>
          <span className="mb-4 block text-xs tracking-[0.3em] uppercase text-gray-500">
            Minha História
          </span>

          <h2 className="mb-8 font-serif text-4xl text-gray-900">
            Jeovanna Isabel
          </h2>

          <div className="space-y-6 text-sm text-gray-600 md:text-base">
            <p>
              Sou apaixonada por contar histórias através de imagens. Meu trabalho nasce
              do olhar atento aos detalhes, da sensibilidade em captar emoções reais e da
              busca constante por uma estética que seja, ao mesmo tempo, autêntica e
              sofisticada.
            </p>

            <p>
              Mais do que produzir fotos ou vídeos, meu propósito é criar narrativas
              visuais que transmitam essência, gerem valor e permaneçam relevantes com o
              passar do tempo — seja no universo digital, corporativo ou pessoal.
            </p>
          </div>

          <div className="my-10 h-px w-full bg-gray-300/60" />

          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-serif text-3xl text-[#b08a4f]">500+</p>
              <span className="text-xs tracking-widest text-gray-500">
                CASAMENTOS
              </span>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#b08a4f]">12</p>
              <span className="text-xs tracking-widest text-gray-500">
                ANOS DE EXPERIÊNCIA
              </span>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#b08a4f]">50+</p>
              <span className="text-xs tracking-widest text-gray-500">
                MARCAS ATENDIDAS
              </span>
            </div>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="relative flex w-full items-center justify-center">
          <div
            className="
              h-[280px] w-[280px]
              md:h-[420px] md:w-[420px]
              overflow-hidden
              bg-black
              animate-[blob_5s_ease-in-out_infinite]
            "
          >
            <img
              src="/portraits/perfil.PNG"
              alt="Jeovanna Isabel"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
