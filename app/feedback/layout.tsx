import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import { LiaSignOutAltSolid } from 'react-icons/lia';

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
      <div className='fixed flex justify-end w-full padding-container z-40 py-4 shadow-md bg-darkTeal-bgColor'>
        <button className='flex flex-row items-center gap-2'>
          <LiaSignOutAltSolid className='text-lg text-teal-navbar_active' />
          <p className='font-semibold text-white-subheading_details'>Log out</p>
        </button>
      </div>
      <main className='relative overflow-hidden'>{children}</main>
      <Footer />
    </div>
  );
}
