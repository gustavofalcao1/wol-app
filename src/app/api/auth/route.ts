import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { LoginCredentials } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json();
    const result = await authenticate(credentials);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 401 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
