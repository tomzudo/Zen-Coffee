'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string; // 🔥 necessário pra comprar
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const router = useRouter();

  const handleBuy = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 🔐 sessão
        body: JSON.stringify({
          items: [
            {
              productId: id,
              quantity: 1,
            },
          ],
        }),
      });

      if (res.status === 401) {
        toast.error('Faça login para comprar');
        router.push('/login');
        return;
      }

      if (!res.ok) throw new Error();

      toast.success('Pedido realizado!');

    } catch {
      toast.error('Erro ao finalizar compra');
    }
  };

  return (
    <div
      className="group rounded-2xl backdrop-blur-md p-4 transition-all duration-300"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black">{name}</h3>

        <p className="text-sm text-black">Zen Coffee</p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-normal text-red-600">
            R$ {price.toFixed(2)}
          </span>

          <button
            onClick={handleBuy}
            className="rounded-full bg-black/80 px-4 py-2 text-sm text-white hover:bg-black transition"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}