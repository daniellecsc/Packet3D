import Footer from '@/components/Footer';
import SingleAnnouncementPage from '@/components/SingleAnnouncementPage';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Access the id from the dynamic segment

  return (
    <>
      <Suspense fallback={<div>Loading Announcements</div>}>
        <SingleAnnouncementPage id={id} />
      </Suspense>

      <Footer />
    </>
  );
}
