// app/api/submit/route.ts
import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { name, email, feedback } = await request.json();

    // Log the received data
    console.log('Received data:', { name, email, feedback });

    // Insert the feedback into the database
    await db.connect();
    await db.sql`INSERT INTO feedbacks (name, email, feedback) VALUES (${name}, ${email}, ${feedback})`;

    return NextResponse.json({
      message: 'Feedback submitted successfully!',
    });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json(
      { error: 'Failed to submit data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch feedbacks from the database
    await db.connect();
    const res = await db.sql`SELECT * FROM feedbacks LIMIT 1000000`;
    const feedbacks = res.rows;

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}
