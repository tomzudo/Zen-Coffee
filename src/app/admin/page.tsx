'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ProductsAdmin() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error('Erro ao carregar produtos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir?')) return;

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      toast.success('Produto excluído');
      fetchProducts();
    } catch {
      toast.error('Erro ao excluir');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <button
          onClick={() => router.push('/admin/products/new')}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Novo Produto
        </button>
      </div>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">
                R$ {p.price.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(`/admin/products/edit/${p.id}`)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}