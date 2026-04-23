import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const sessionId = cookie.split('session=')[1]?.split(';')[0];

  if (sessionId) {
    await prisma.session.delete({
      where: { id: sessionId },
    }).catch(() => {});
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set('session', '', {
    expires: new Date(0),
    path: '/',
  });

  return res;
}