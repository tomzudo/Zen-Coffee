'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CreateProduct = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price) {
      return toast.error('Preencha os campos obrigatórios');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          status: 'ACTIVE',
        }),
      });

      if (!res.ok) throw new Error();

      toast.success('Produto criado!');
      router.push('/admin/products');
    } catch {
      toast.error('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Criar Produto</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? 'Criando...' : 'Criar Produto'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;