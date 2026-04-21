import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#483215]/50 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Zen Coffee
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              O melhor café para os amantes de café.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-zinc-300">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white">Início</a></li>
              <li><a href="#" className="hover:text-white">Produtos</a></li>
              <li><a href="#" className="hover:text-white">Kits</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-zinc-300">
              Redes
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">TikTok</a></li>
              <li><a href="#" className="hover:text-white">WhatsApp</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-500 text-montserrat">
          © {new Date().getFullYear()} Zen Coffee. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
};

export default Footer;