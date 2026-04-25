import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

function handleError(error: unknown) {
  console.error(error);

  return NextResponse.json(
    {
      message:
        error instanceof Error ? error.message : 'Internal server error',
    },
    { status: 500 }
  );
}

export async function POST(request: Request) {
  try {
    await requireAuth();

    const { name, description, price, status } = await request.json();

    if (!name || !description || price == null || !status) {
      return NextResponse.json(
        { message: 'Missing fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        status,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return unauthorized();
    }

    return handleError(error);
  }
}

export async function GET() {
  try {
    await requireAuth();

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return unauthorized();
    }

    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAuth();

    const { id, name, description, price, status } = await request.json();

    if (!id || !name || !description || price == null) {
      return NextResponse.json(
        { message: 'Missing fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        status,
      },
    });

    return NextResponse.json(product);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return unauthorized();
    }

    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Missing id' },
        { status: 400 }
      );
    }

    const product = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(product);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return unauthorized();
    }

    if (typeof error === 'object' && error !== null && 'code' in error) {
      const err = error as { code?: string };

      if (err.code === 'P2025') {
        return NextResponse.json(
          { message: 'Product not found' },
          { status: 404 }
        );
      }
    }

    return handleError(error);
  }
}