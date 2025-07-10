import { Inter } from 'next/font/google';
import "./globals.css";
import React from "react";
import { Toaster } from 'react-hot-toast'; // 👈 Importa aqui

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata = {
  title: 'macacada store',
  description: 'E-commerce com Next.js e Tailwind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster position="top-right" reverseOrder={false} /> {/* 👈 Adiciona aqui */}
      </body>
    </html>
  );
}
