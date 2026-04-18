import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const admin = req.cookies.get('admin');

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !admin) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};