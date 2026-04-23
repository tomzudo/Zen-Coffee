import { prisma } from './prisma';
import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: true,
    },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({
      where: { id: session.id },
    }).catch(() => {});
    return null;
  }

  return session;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}