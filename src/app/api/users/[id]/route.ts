import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { users } from '@/data/users';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { username, password, role } = await request.json();
    const userId = params.id;

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if new username already exists (except for current user)
    if (username !== users[userIndex].username &&
        users.some(u => u.username === username)) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      role: role || users[userIndex].role,
      ...(password && { password: hashPassword(password) })
    };

    // Return user without password
    const { password: _, ...safeUser } = users[userIndex];
    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Remove user
    users.splice(userIndex, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
