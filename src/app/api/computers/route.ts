import { NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET() {
  try {
    const computers = await db.getComputers();
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
    const computer = await request.json();
    const newComputer = await db.addComputer(computer);
    return NextResponse.json(newComputer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add computer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const computer = await request.json();
    const updatedComputer = await db.updateComputer(computer);
    return NextResponse.json(updatedComputer);
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
    await db.deleteComputer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete computer' },
      { status: 500 }
    );
  }
}
