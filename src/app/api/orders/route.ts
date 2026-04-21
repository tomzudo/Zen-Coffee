import { NextResponse } from "next/server";
import {prisma} from "@lib/prisma";

interface Item {
  productId: number;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    const { userId, items }: { userId: number; items: Item[] } = await request.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "O ID do usuário e os itens do pedido são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("Dados recebidos no pedido:", { userId, items });

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      console.log("Usuário não encontrado com ID:", userId);
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const newOrder = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true }, 
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o pedido:", error);
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}
