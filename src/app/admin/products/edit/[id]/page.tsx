'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !product.price) {
      return toast.error('Dados inválidos');
    }

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error();

      toast.success('Produto atualizado!');
      router.push('/admin/products');
      router.refresh();
    } catch {
      toast.error('Erro ao atualizar produto');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Editar Produto</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Nome"
        />

        <input
          type="text"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Descrição"
        />

        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
          placeholder="Preço"
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;