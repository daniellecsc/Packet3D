import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

// POST: Create a new announcement
export async function POST(request: Request) {
  try {
    const { title, content, user_id } = await request.json();

    if (!title || !content || !user_id) {
      return NextResponse.json(
        { error: 'Title, content, and user_id are required' },
        { status: 400 }
      );
    }

    await db.sql`
      INSERT INTO announcements (title, content, user_id, created_at, updated_at)
      VALUES (${title}, ${content}, ${user_id}, NOW(), NOW())`;

    return NextResponse.json({ message: 'Announcement created successfully!' });
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    );
  }
}

// GET: Fetch all announcem// GET: Fetch all announcements or a specific announcement by ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const announcementId = searchParams.get('announcementId');

    if (announcementId) {
      // Fetch a specific announcement by ID
      const res = await db.sql`
        SELECT id, title, content, user_id, created_at::date AS created_at, updated_at::date AS updated_at
        FROM announcements
        WHERE id = ${announcementId}
        ORDER BY created_at DESC`; // Ensures sorting by created_at

      if (res.rows.length === 0) {
        return NextResponse.json(
          { error: 'Announcement not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(res.rows[0]);
    } else {
      // Fetch all announcements and always sort them by created_at DESC
      const res = await db.sql`
        SELECT id, title, content, user_id, created_at::date AS created_at, updated_at::date AS updated_at
        FROM announcements
        ORDER BY created_at DESC
        LIMIT 100`;

      return NextResponse.json(res.rows);
    }
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}
// PUT: Edit an existing announcement
export async function PUT(request: Request) {
  try {
    const { id, title, content } = await request.json();

    console.log('Received data for update:', { id, title, content });

    if (!id || !title || !content) {
      console.error('Missing required fields:', { id, title, content });
      return NextResponse.json(
        { error: 'Announcement ID, title, and content are required' },
        { status: 400 }
      );
    }

    const result = await db.sql`
      UPDATE announcements
      SET title = ${title}, content = ${content}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *`;

    if (result.rowCount === 0) {
      console.warn('No announcement found with the provided ID:', id);
      return NextResponse.json(
        { error: 'Announcement not found or no changes made' },
        { status: 404 }
      );
    }

    console.log('Announcement updated successfully:', result.rows[0]);
    return NextResponse.json({ message: 'Announcement updated successfully!' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return NextResponse.json(
      { error: 'Failed to update announcement' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an announcement by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Announcement ID is required' },
        { status: 400 }
      );
    }

    await db.sql`DELETE FROM announcements WHERE id = ${id}`;

    return NextResponse.json({ message: 'Announcement deleted successfully!' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    );
  }
}
