import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ButtonSignOut from '@/components/signOut';
import Image from 'next/image';

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
      <div className='fixed flex justify-between w-full z-40 padding-container py-4 shadow-md bg-darkTeal-bgColor'>
        <Link href='/'>
          <Image src='/Logo.webp' alt='logo' width={110} height={50} />
        </Link>
        <ButtonSignOut />
      </div>
      <main className='relative overflow-hidden'>{children}</main>
      <Footer />
    </div>
  );
}
