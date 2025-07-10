// app/api/orders/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@lib/prisma";

// Definir o tipo de um item
interface Item {
  productId: number;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    // Lê os dados da requisição (usuário e itens)
    const { userId, items }: { userId: number; items: Item[] } = await request.json();

    // Verifica se os dados necessários estão presentes
    if (!userId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "O ID do usuário e os itens do pedido são obrigatórios" },
        { status: 400 }
      );
    }

    // Adicione o console.log para verificar o userId e os itens recebidos
    console.log("Dados recebidos no pedido:", { userId, items });

    // Verifica se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Verifique se o usuário foi encontrado
    if (!userExists) {
      console.log("Usuário não encontrado com ID:", userId);
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    // Calcula o total do pedido
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Cria o pedido no banco de dados
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
      include: { items: true }, // Inclui os itens no retorno
    });

    // Retorna o pedido recém-criado
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o pedido:", error);
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}
