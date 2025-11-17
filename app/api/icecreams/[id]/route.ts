import { NextRequest, NextResponse } from 'next/server';
import { iceCreamService } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const iceCream = iceCreamService.findById(parseInt(params.id));

    if (!iceCream) {
      return NextResponse.json(
        { error: 'Ice cream not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(iceCream);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ice cream' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, brand, rating, isFavorite, description } = body;

    const iceCream = iceCreamService.update(parseInt(params.id), {
      name,
      brand,
      rating,
      isFavorite,
      description,
    });

    return NextResponse.json(iceCream);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update ice cream' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    iceCreamService.delete(parseInt(params.id));
    return NextResponse.json({ message: 'Ice cream deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete ice cream' },
      { status: 500 }
    );
  }
}