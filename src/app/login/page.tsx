'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!res.ok) {
        toast.error('Credenciais inválidas');
        return;
      }

      toast.success('Login realizado!');

      // 🔥 fluxo correto sem hack
      router.push('/admin/products');
      router.refresh();

    } catch {
      toast.error('Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2E0]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Only Admiro
        </h1>

        <input
          type="text"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-6 p-2 border rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}