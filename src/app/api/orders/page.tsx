// src/app/orders/page.tsx
import { useEffect, useState } from 'react';
import React from "react";
interface Order {
  id: number;
  totalAmount: number;
  status: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded">
            <h2 className="text-xl">Pedido #{order.id}</h2>
            <p className="text-gray-600">Total: R${order.totalAmount}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
