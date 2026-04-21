import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          
          {/* MARCA */}
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Macaco Store
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Streetwear oldschool para quem vive atitude.
            </p>
          </div>

          {/* LINKS */}
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

          {/* SOCIAL */}
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

        {/* LINHA FINAL */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-500 text-montserrat">
          © {new Date().getFullYear()} Macaco Store. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
};

export default Footer;