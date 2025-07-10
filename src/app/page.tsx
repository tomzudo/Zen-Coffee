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

  // Campos do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const fetchProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
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

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage('');

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
      }),
    });

    setFormLoading(false);

    if (res.ok) {
      setFormMessage('Produto criado com sucesso!');
      setName('');
      setDescription('');
      setPrice('');
      fetchProducts();
    } else {
      const error = await res.json();
      setFormMessage(`Erro: ${error.message || 'Erro ao criar produto'}`);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
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
      {/* Formulário de criação */}
      <form
        onSubmit={handleCreateProduct}
        className="space-y-4 border p-6 rounded-xl max-w-md mx-auto bg-gray shadow mb-10"
      >
        <h2 className="text-2xl font-bold text-gray-800 italic">Criar novo produto</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded text-gray-700"
          required
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded text-gray-700"
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded text-gray-700"
          required
        />

        <button
          type="submit"
          disabled={formLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {formLoading ? 'Salvando...' : 'Criar produto'}
        </button>

        {formMessage && <p className="text-sm mt-2 text-gray-700">{formMessage}</p>}
      </form>

      {/* Lista de produtos */}
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
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-green-600 font-bold mt-2">R$ {product.price.toFixed(2)}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
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
