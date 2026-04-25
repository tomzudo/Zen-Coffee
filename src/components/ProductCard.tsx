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
      className=" group rounded-2x1 backdrop-blur-md p-12 transition-all duration-300"
    >
      <div className="rounded-xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-normal text-black">{name}</h3>

        <p className="text-sm text-black">Zen Coffee</p>


      <div className="mt-4 flex flex-col items-center">
        <button
          onClick={handleBuy}
          className="w-full max-w-[340px] bg-[#483215]/70 py-3 text-sm text-white hover:bg-[#483215]/50 transition"
        >
          Adicionar ao carrinho
        </button>

        <span className="mt-2 text-lg font-semibold text-red-600 text-4x1 text-center w-full max-w-[220px]">
          R$ {price.toFixed(2)}
        </span>
      </div>

      </div>
    </div>
  );
}