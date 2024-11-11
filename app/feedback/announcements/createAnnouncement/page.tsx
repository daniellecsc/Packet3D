import AdminFeedbackPage from '@/components/AdminFeedbackPage';
import AnnouncementsForm from '@/components/announcementsForm';
import { sql } from '@vercel/postgres';
export const fetchCache = 'force-no-store';

export default async function Page() {
  return (
    <>
      <AnnouncementsForm />
    </>
  );
}
