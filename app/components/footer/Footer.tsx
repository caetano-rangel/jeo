export default function Footer() {
  return (
    <footer className="bg-[#f7f7f5] border-t border-black/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:gap-0">
        
        {/* LOGO */}
        <span className="font-serif text-lg text-gray-900">
          Jeovanna Isabel
        </span>

        {/* MENU */}
        <nav className="flex gap-8 text-xs tracking-widest text-gray-600">
          <a href="https://wa.me/5591980486792?text=Olá!%20Gostaria%20de%20fazer%20um%20orçamento." target="_blank" className="hover:text-gray-900 transition">
            WHATSAPP
          </a>
          <a href="https://instagram.com/jeovannaisaabel" target="_blank" className="hover:text-gray-900 transition">
            INSTAGRAM
          </a>
          <a href="" target="_blank" className="hover:text-gray-900 transition">
            EMAIL
          </a>
        </nav>

        {/* COPYRIGHT */}
        <span className="text-xs text-gray-500">
          © 2025 Jeovanna Isabel. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
