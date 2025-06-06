import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/lib/auth';

/**
 * Middleware to protect API routes
 * Validates JWT token in Authorization header
 */
export async function middleware(request: NextRequest) {
  // Ignore authentication for login route
  if (request.nextUrl.pathname === '/api/auth') {
    return NextResponse.next();
  }

  // Check for token in headers
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Verify token
  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/:path*'
};
