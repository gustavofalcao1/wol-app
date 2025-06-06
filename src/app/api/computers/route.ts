import { NextResponse } from 'next/server';
import { getComputers, addComputer, updateComputer, deleteComputer } from '@/data/db';
import type { Computer } from '@/types/db';

export async function GET() {
  try {
    const computers = await getComputers();
    return NextResponse.json(computers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch computers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const computer: Computer = await request.json();
    const result = await addComputer(computer);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add computer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const computer: Computer = await request.json();
    const result = await updateComputer(computer);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update computer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteComputer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete computer' },
      { status: 500 }
    );
  }
}
