'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateProduct = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('available'); // Valor default para status
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          status,  // Incluindo o status
        }),
      });

      if (res.ok) {
        alert('Produto criado com sucesso!');
        router.push('/products');
      } else {
        const errorData = await res.json();
        alert(`Erro ao criar produto: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      alert('Erro inesperado ao criar produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Criar Produto</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block">Nome</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Descrição</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Preço</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Status</label>
          <select
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="available">Disponível</option>
            <option value="unavailable">Indisponível</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Criar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
