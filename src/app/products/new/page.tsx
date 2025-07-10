'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateProduct = () => {
  const router = useRouter(); // Usado para navegar entre as páginas
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  // Função para enviar os dados para a API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Impede o comportamento padrão do form

    setLoading(true); // Inicia o carregamento

    try {
      // Envia os dados do formulário para a API
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
        }),
      });

      // Se a resposta for positiva, redireciona para a página de produtos
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
      setLoading(false); // Finaliza o carregamento
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
          <button
            type="submit"
            className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? 'Carregando...' : 'Criar Produto'} {/* Texto do botão */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
