// src/app/products/page.tsx
'use client'; // Diretiva para tratar o componente como cliente
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from "react";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string; // Incluído para exibir status
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Produtos</h1>
      <Link
        href="/products/new"
        className="mb-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        Adicionar Produto
      </Link>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-blue-600">R${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">Status: {product.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
