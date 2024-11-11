import About from '@/components/About';
import AnnouncementsPage from '@/components/AnnouncementsPage';
import Contact from '@/components/Contact';
import DownloadPage from '@/components/DownloadPage';
import Hero from '@/components/Hero';
import Team from '@/components/Team';
import Trailer from '@/components/Trailer';

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Trailer />
      <AnnouncementsPage />
      <DownloadPage />
      <Contact />
      <Team />
    </>
  );
}
