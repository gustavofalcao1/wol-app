import { NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const groups = await db.getGroups();
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const group = await request.json();
    const newGroup = await db.addGroup(group);
    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add group' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const group = await request.json();
    const updatedGroup = await db.updateGroup(group);
    return NextResponse.json(updatedGroup);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update group' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.deleteGroup(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete group' },
      { status: 500 }
    );
  }
}
