import Footer from '@/components/Footer';
import SingleAnnouncementPage from '@/components/SingleAnnouncementPage';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Access the id from the dynamic segment

  return (
    <>
      <SingleAnnouncementPage id={id} />
      <Footer />
    </>
  );
}
