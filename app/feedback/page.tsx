import AdminFeedbackPage from '@/components/AdminFeedbackPage';
import { sql } from '@vercel/postgres';
export const fetchCache = 'force-no-store';

export default async function Adminlogin() {
  const res = await sql`
      SELECT * FROM feedbacks LIMIT 1000000
  `;
  const feedbacks = res.rows;

  return (
    <>
      <AdminFeedbackPage feedbacks={feedbacks} />
    </>
  );
}
