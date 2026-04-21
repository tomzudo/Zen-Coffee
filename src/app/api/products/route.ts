import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma';

function isAdmin(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  return cookie.includes('admin=true');
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { name, description, price, status } = await request.json();

    if (!name || !description || !price || !status) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

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

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAdmin(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { id, name, description, price } = await request.json();

    if (!id || !name || !description || !price) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdmin(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Product not found' },
      { status: 404 }
    );
  }
}