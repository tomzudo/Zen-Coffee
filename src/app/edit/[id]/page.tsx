// src/app/edit/[id]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
        if (!res.ok) {
          throw new Error('Produto não encontrado');
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setProduct(null); // força renderizar "Produto não encontrado"
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Erro ao atualizar produto');
      }

      alert('Produto atualizado com sucesso');
      router.push('/products');
      router.refresh(); // força recarregar a lista atualizada no App Router
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      alert('Erro ao editar produto');
    }
  };

  if (!id) {
    return <p>Carregando ID do produto...</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label htmlFor="name" className="block">Nome:</label>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block">Descrição:</label>
          <input
            type="text"
            id="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="price" className="block">Preço:</label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
            className="mt-1 p-2 border rounded w-full"
            required
            min="0"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
