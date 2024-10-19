import AdminFeedbackPage from '@/components/AdminFeedbackPage';
import { sql } from '@vercel/postgres';
export const fetchCache = 'force-no-store';

export default async function Adminlogin() {
  return (
    <>
      <AdminFeedbackPage />
    </>
  );
}
