// src/components/ProductCard.tsx
'use client';

import React from 'react';

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: { id: number; name: string; description: string; price: number };
  onEdit: (product: { id: number; name: string; description: string; price: number }) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 font-semibold text-lg">R$ {product.price.toFixed(2)}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
