import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

// POST (criar produto)
export async function POST(request: Request) {
  try {
    // Extraindo os dados da requisição
    const { name, description, price, status } = await request.json();

    // Verificando se todos os campos necessários estão presentes
    if (!name || !description || !price || !status) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Criando o produto no banco de dados
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Retornando a resposta com o produto criado
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    // Tratamento de erro aprimorado
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    // Caso o erro não seja uma instância de Error, retornamos uma resposta genérica
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// GET (buscar todos os produtos)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc', // Ordenando por data de criação
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// PUT (atualizar produto)
export async function PUT(request: Request) {
  try {
    // Extraindo os dados da requisição
    const { id, name, description, price } = await request.json();

    // Verificando se todos os campos necessários estão presentes
    if (!id || !name || !description || !price) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Atualizando o produto no banco de dados
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        updatedAt: new Date(), // Atualiza a data de modificação
      },
    });

    // Retornando a resposta com o produto atualizado
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: unknown) {
    // Tratamento de erro aprimorado
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    // Caso o erro não seja uma instância de Error, retornamos uma resposta genérica
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// DELETE (remover produto)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Deletando o produto com base no ID
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) }, // Certificando-se de que o ID é convertido para número
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
