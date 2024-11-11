import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ButtonSignOut from '@/components/signOut';
import Image from 'next/image';
import Tabs from '@/components/TabsComponent';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      link: '/admin/feedbacks',
      label: 'Feedbacks',
      routes: ['/admin/feedbacks'],
    },
    {
      link: '/admin/announcements/edit',
      label: 'Announcement',
      routes: [
        '/admin/announcements/createAnnouncement',
        '/admin/announcements/edit',
      ],
    },
  ];

  return (
    <SessionProvider>
      <div className='relative bg-darkTeal-bgColor'>
        {' '}
        {/* Ensure everything is contained */}
        <div className='fixed top-0 left-0 right-0 z-40 py-4 shadow-md bg-darkTeal-bgColor'>
          <div className='flex justify-between w-full px-10'>
            <Link href='/'>
              <Image src='/Logo.webp' alt='logo' width={110} height={50} />
            </Link>
            <ButtonSignOut className='hover:text-white-headline_titles_description' />
          </div>
        </div>
        {/* Content Wrapper */}
        <div className='pt-[80px] bg-transparent px-10'>
          {/* Add padding-top to push content below the header */}
          <Tabs orientation='row' tabs={tabs} />
          {/* Main Content */}
          <main className='relative overflow-hidden mt-8'>{children}</main>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
