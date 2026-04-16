'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-black text-white border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-lg font-bold tracking-wide uppercase text-yellow-500">
            Macaco Store
          </h1>
          <p className="text-xs text-zinc-400">Streetwear oldschool</p>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="transition hover:text-zinc-300">
            Início
          </a>
          <a href="#" className="transition hover:text-zinc-300">
            Kits
          </a>
          <a href="#" className="transition hover:text-zinc-300">
            Produtos
          </a>
          <a href="#" className="transition hover:text-zinc-300">
            Contato
          </a>
        </nav>

        {/* AÇÕES */}
        <div className="flex items-center gap-3">
          {/* Placeholder busca */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900 transition hover:bg-zinc-800">
            <span className="text-sm">⌕</span>
          </button>

          {/* Placeholder carrinho */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900 transition hover:bg-zinc-800">
            <span className="text-sm">🛒</span>
          </button>

          {/* Menu mobile */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900 md:hidden">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;