import { NextResponse } from 'next/server';
import { getGroups, addGroup, updateGroup, deleteGroup } from '@/data/db';
import type { ComputerGroup } from '@/types/db';

export async function GET() {
  try {
    const groups = await getGroups();
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
    const group: ComputerGroup = await request.json();
    const result = await addGroup(group);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add group' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const group: ComputerGroup = await request.json();
    const result = await updateGroup(group);
    return NextResponse.json(result);
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
    await deleteGroup(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete group' },
      { status: 500 }
    );
  }
}
