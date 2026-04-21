'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'tom' && password === 'TOMASturbano') {
      document.cookie = 'admin=true; path=/;';

      toast.success('Login realizado!');
      router.push('/admin/products');
    } else {
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2E0]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Only Admiro</h1>

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