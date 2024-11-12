import AdminFeedbackPage from '@/components/AdminFeedbackPage';
import AdminAnnouncementsList from '@/components/AdminAnnouncementsList';
import { sql } from '@vercel/postgres';
export const fetchCache = 'force-no-store';

export default async function Page() {
  return (
    <>
      <AdminAnnouncementsList />
    </>
  );
}
