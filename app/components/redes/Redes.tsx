export default function Redes() {
  return (
    <section className="bg-[#111111] px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        {/* TÍTULO */}
        <h2 className="mb-6 font-serif text-3xl text-white md:text-4xl">
          Conheça Nosso Trabalho de Perto
        </h2>

        {/* SUBTÍTULO */}
        <p className="mx-auto mb-14 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Quer entender melhor como funciona nosso processo e descobrir as
          melhores opções para sua próxima experiência? Entre em contato e
          converse diretamente conosco.
        </p>

        {/* BOTÕES */}
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          {/* WHATSAPP / TELEFONE */}
          <a
            href="https://wa.me/5591980486792?text=Olá!%20Gostaria%20de%20fazer%20um%20orçamento."
            target="_blank"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#c9a86a]
              px-9
              py-3.5
              text-sm
              tracking-wide
              text-[#c9a86a]
              transition
              hover:bg-[#c9a86a]
              hover:text-black
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 7.593 6.157 13.75 13.75 13.75.69 0 1.36-.05 2.02-.15a1.5 1.5 0 001.23-1.23l.38-2.09a1.5 1.5 0 00-1.07-1.72l-2.27-.57a1.5 1.5 0 00-1.55.56l-.97 1.18a11.05 11.05 0 01-4.93-4.93l1.18-.97a1.5 1.5 0 00.56-1.55l-.57-2.27a1.5 1.5 0 00-1.72-1.07l-2.09.38a1.5 1.5 0 00-1.23 1.23c-.1.66-.15 1.33-.15 2.02z"
              />
            </svg>

            Fale conosco
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/jeovannaisaabel"
            target="_blank"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-gray-600
              px-9
              py-3.5
              text-sm
              tracking-wide
              text-gray-300
              transition
              hover:border-white
              hover:text-white
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 3.75h9A3.75 3.75 0 0120.25 7.5v9a3.75 3.75 0 01-3.75 3.75h-9A3.75 3.75 0 013.75 16.5v-9A3.75 3.75 0 017.5 3.75z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>

            Ver no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
