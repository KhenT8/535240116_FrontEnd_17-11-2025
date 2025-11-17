import { NextRequest, NextResponse } from 'next/server';
import { iceCreamService } from '@/lib/database';

export async function GET() {
  try {
    const iceCreams = iceCreamService.findAll();
    return NextResponse.json(iceCreams);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ice creams' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, brand, rating, isFavorite, description } = body;

    if (!name || !brand) {
      return NextResponse.json(
        { error: 'Name and brand are required' },
        { status: 400 }
      );
    }

    const iceCream = iceCreamService.create({
      name,
      brand,
      rating: rating || 3,
      isFavorite: isFavorite || false,
      description: description || '',
    });

    return NextResponse.json(iceCream, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create ice cream' },
      { status: 500 }
    );
  }
}