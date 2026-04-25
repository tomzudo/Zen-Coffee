import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

interface Item {
  productId: string; // 🔥 corrigido
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const session = await requireAuth();

    const { items }: { items: Item[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Itens do pedido são obrigatórios' },
        { status: 400 }
      );
    }

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: 'Produto inválido no pedido' },
        { status: 400 }
      );
    }

    const total = items.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId)!;
      return acc + product.price * item.quantity;
    }, 0);

    const newOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.error('Erro ao criar pedido:', error);

    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
}