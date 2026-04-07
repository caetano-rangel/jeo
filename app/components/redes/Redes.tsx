import React, { ReactNode } from 'react';

// Tipagem simples para os botões
interface SocialButtonProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  primary?: boolean;
}

const SocialButton = ({ href, icon, children, primary = false }: SocialButtonProps) => {
  const baseStyles = "inline-flex items-center gap-3 rounded-full px-9 py-3.5 text-sm tracking-wide transition-all duration-300 hover:scale-105";
  
  const variants = primary 
    ? "border border-[#c9a86a] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-black" 
    : "border border-gray-600 text-gray-300 hover:border-white hover:text-white";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${variants}`}>
      {icon}
      {children}
    </a>
  );
};

export default function Redes() {
  return (
    <section className="bg-[#111111] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        
        <h2 className="mb-6 font-serif text-3xl text-white md:text-5xl">
          Conheça Nosso Trabalho <span className="text-[#c9a86a]">de Perto</span>
        </h2>
        
        <p className="mx-auto mb-12 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
          Quer entender melhor nosso processo e descobrir as melhores opções para sua próxima experiência? 
          Entre em contato e converse diretamente conosco.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SocialButton 
            href="https://wa.me/5591980486792?text=Olá!%20Gostaria%20de%20fazer%20um%20orçamento."
            primary
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          >
            Fale conosco
          </SocialButton>

          <SocialButton 
            href="https://instagram.com/jeovannaisaabel"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            }
          >
            Ver no Instagram
          </SocialButton>
        </div>

      </div>
    </section>
  );
}