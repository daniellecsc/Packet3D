import About from '@/components/About';
import AdminLogIn from '@/components/AdminLogIn';
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
      <DownloadPage />
      <Contact />
      <Team />
    </>
  );
}
