import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton'; // Import the button component

export const metadata: Metadata = {
  title: 'Packet3D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className='relative overflow-hidden'>{children}</main>
      <Footer />
      <ScrollToTopButton /> {/* The button will appear here */}
    </div>
  );
}
