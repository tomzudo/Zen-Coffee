'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white text-black border-b border-zinc-200">
      
      <div className="w-full bg-zinc-900 text-white text-xs text-center py-2">
        Cuidado com golpes! Esse é nosso site oficial ☕
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        
        <div className="flex items-center justify-between">
          
          <div className="w-32" />

          <div className="text-center">
            <h1 className="text-2xl tracking-[0.3em] font-semibold">
              ZEN
            </h1>
            <p className="text-xs tracking-[0.4em] text-zinc-500">
              COFFEE
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <button className="hover:text-zinc-500 transition">
              Entrar
            </button>
            <button className="hover:text-zinc-500 transition">
              Carrinho (0)
            </button>
            <button className="hover:text-zinc-500 transition">
              Buscar
            </button>
          </div>
        </div>

        <nav className="mt-6 flex items-center justify-center gap-10 text-sm tracking-wide">
          <a href="#" className="hover:text-zinc-500 transition">
            CAFÉ EM CÁPSULA
          </a>
          <a href="#" className="hover:text-zinc-500 transition">
            CAFÉ MOÍDO E GRÃO
          </a>
          <a href="#" className="hover:text-zinc-500 transition">
            KITS
          </a>
          <a href="#" className="hover:text-zinc-500 transition">
            ASSINATURA
          </a>
          <a href="#" className="hover:text-zinc-500 transition">
            ACESSÓRIOS
          </a>
        </nav>

      </div>
    </header>
  );
};

export default Header;