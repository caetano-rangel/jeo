export default function Footer() {
  return (
    <footer className="bg-cream-soft border-t border-black/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:gap-0">
        
        {/* LOGO */}
        <span className="font-serif text-lg text-gray-900">
          Jeovanna Isabel
        </span>

        {/* MENU */}
        <nav className="flex gap-8 text-xs tracking-widest text-gray-600">
          <a
            href="https://wa.me/5591980486792?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold-dark"
          >
            WHATSAPP
          </a>
          <a
            href="https://instagram.com/jeovannaisaabel"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold-dark"
          >
            INSTAGRAM
          </a>
          <a
            href="mailto:contato@jeovannaisabel.com.br"
            className="transition hover:text-gold-dark"
          >
            EMAIL
          </a>
        </nav>

        {/* COPYRIGHT */}
        <span className="text-xs text-gray-500">
          © {new Date().getFullYear()} Jeovanna Isabel. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
