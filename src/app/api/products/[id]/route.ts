import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

// Função para pegar um erro de forma amigável
function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Erro desconhecido";
}

// GET - Buscar produto por ID
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: parsedId },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Atualizar produto por ID
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, description, price } = body;

    if (!name?.trim() || !description?.trim() || price == null) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parsedId },
      data: { name, description, price },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Deletar produto por ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    // Deleta primeiro os itens relacionados
    await prisma.orderItem.deleteMany({
      where: { productId: parsedId },
    });

    // Depois deleta o produto
    const deletedProduct = await prisma.product.delete({
      where: { id: parsedId },
    });

    return NextResponse.json(
      { message: "Produto e itens relacionados deletados com sucesso", product: deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
