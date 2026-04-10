'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log('Produtos recebidos pela api', data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Produto excluído com sucesso!');
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert(`Erro ao excluir produto: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      alert('Erro inesperado ao excluir produto.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* BOTÃO DE CRIAR */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end">
        <button
          onClick={() => router.push('/products')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Criar novo produto
        </button>
      </div>

      {/* LISTA */}
      {loading ? (
        <p className="text-gray-600 text-center">Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border p-4 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {product.description}
                </p>
                <p className="text-green-600 font-bold mt-2">
                  R$ {product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-sm bg-black hover:bg-black-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;