import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { users } from '@/data/users';
import { User } from '@/types/auth';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export async function GET() {
  // Remove password from response
  const safeUsers = users.map(({ password, ...user }) => user);
  return NextResponse.json(safeUsers);
}

export async function POST(request: Request) {
  try {
    const { username, password, role } = await request.json();

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if username already exists
    if (users.some(u => u.username === username)) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser: User = {
      id: String(users.length + 1),
      username,
      password: hashPassword(password),
      role: role || 'user'
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...safeUser } = newUser;
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
