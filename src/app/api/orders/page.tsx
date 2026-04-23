'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  total: number;
  status: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          credentials: 'include', // 🔐 sessão
        });

        if (res.status === 401) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        setOrders(data);

      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded">
              <h2 className="text-xl">Pedido #{order.id}</h2>
              <p className="text-gray-600">
                Total: R$ {order.total.toFixed(2)}
              </p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}