'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full bg-white text-black border-b border-zinc-200">

      <div className="w-full bg-zinc-900 text-white text-xs text-center py-2">
        Qualidade, sabor e aroma incomparáveis para os amantes de café.
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        
        <div className="flex items-center justify-between">
          
          <div className="w-40" />

          <div className="text-center">
            <Link href="/">
              <h1 className="text-2xl tracking-[0.3em] font-semibold">
                ZEN
              </h1>
              <p className="text-xs tracking-[0.4em] text-zinc-500">
                COFFEE
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm">
            
            <button
              onClick={() => router.push('/login')}
              className="hover:text-zinc-500 transition"
            >
              Entrar
            </button>

            <button
              onClick={() => router.push('/orders')}
              className="hover:text-zinc-500 transition"
            >
              Pedidos
            </button>

            <button
              onClick={() => alert('Busca em breve')}
              className="hover:text-zinc-500 transition"
            >
              Buscar
            </button>
          </div>
        </div>

        <nav className="mt-6 flex items-center justify-center gap-10 text-sm tracking-wide">
          <Link href="/#products" className="hover:text-zinc-500 transition">
            CAFÉ EM CÁPSULA
          </Link>
          <Link href="/#products" className="hover:text-zinc-500 transition">
            CAFÉ MOÍDO E GRÃO
          </Link>
          <Link href="/#products" className="hover:text-zinc-500 transition">
            KITS
          </Link>
          <Link href="/#products" className="hover:text-zinc-500 transition">
            ASSINATURA
          </Link>
          <Link href="/#products" className="hover:text-zinc-500 transition">
            ACESSÓRIOS
          </Link>
        </nav>

      </div>
    </header>
  );
}