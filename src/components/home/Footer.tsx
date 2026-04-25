import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#483215]/50 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          <div>
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Zen Coffee
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              O melhor café para quem leva café a sério.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-zinc-300">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-white transition">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition">
                  Meus pedidos
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-zinc-300">
              Redes
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5599999999999"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Zen Coffee. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}