// src/app/api/generate-card/route.js

import { NextResponse } from 'next/server';

// Handling POST request
export async function POST(req) {
  try {
    const { name, recipient, message } = await req.json();

    // Process the received data (for now, we simply return the same data)
    return NextResponse.json({
      message: 'Card generated successfully!',
      data: { name, recipient, message },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate card' }, { status: 500 });
  }
}
