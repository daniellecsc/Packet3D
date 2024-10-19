import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

// POST: Submit feedback
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

// GET: Fetch feedbacks
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

// DELETE: Delete a feedback by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // Get the id from the query parameters

    if (!id) {
      return NextResponse.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    // Delete feedback from the database
    await db.connect();
    await db.sql`DELETE FROM feedbacks WHERE id = ${id}`;

    return NextResponse.json({
      message: 'Feedback deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to delete feedback' },
      { status: 500 }
    );
  }
}
