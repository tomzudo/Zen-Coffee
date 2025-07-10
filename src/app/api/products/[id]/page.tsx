// src/app/orders/[id]/page.tsx

'use client'; // Diretiva para garantir que o componente seja de cliente

import { useEffect, useState } from 'react';
import React from "react";

interface OrderDetail {
  id: number;
  totalAmount: number;
  status: string;
  items: Array<{ productName: string; quantity: number; price: number }>;
}

const OrderDetailPage = ({ params }: { params: { id: string } }) => { 
  const { id } = params; // Acessando o 'id' da URL através de 'params'
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    if (!id) return;  // Se o ID não estiver disponível, não faz a requisição

    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id]);  // A dependência é o 'id'

  if (!order) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Pedido Detalhes</h1>
      <p>Status: {order.status}</p>
      <p>Total: R${order.totalAmount}</p>
      <ul className="space-y-4">
        {order.items.map((item, index) => (
          <li key={index} className="border p-4 rounded">
            <p>Produto: {item.productName}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço: R${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailPage;
