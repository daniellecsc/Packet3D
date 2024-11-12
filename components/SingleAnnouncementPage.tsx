'use client';

import { Announcement } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';

export default function SingleAnnouncementPage({ id }: { id: string }) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchAnnouncement = async (announcementId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/announcements?announcementId=${announcementId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch announcement');
      }
      const data = await response.json();
      setAnnouncement(data);

      return true;
    } catch (error) {
      console.error('Error fetching announcement:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAnnouncement(id); // Call the function correctly
  }, [id]);

  return (
    <section className='w-full space-y-10 py-10 px-20 bg-darkTeal-bgColor min-h-screen'>
      {loading ? (
        <>
          <div className='flex gap-1 flex-col text-white-headline_titles_description w-full'>
            <div className='h-10 bg-teal-inputf_border rounded w-3/4 mb-2'></div>
            <div className='h-2 bg-teal-inputf_border rounded w-[200px] mb-2'></div>
            <div className='flex w-full border-b-[1px] border-teal-inputf_border'></div>
          </div>
          <div className='flex gap-1 text-white-headline_titles_description w-full'>
            <div className='h-6 bg-teal-inputf_border rounded w-3/4 mb-2'></div>
          </div>
        </>
      ) : (
        <>
          <div className='flex gap-1 flex-col text-white-headline_titles_description w-full'>
            <h1 className='text-4xl font-bold'>{announcement?.title}</h1>
            <p className='text-xs text-gray-500 opacity-50 font-normal'>
              Posted At:{' '}
              {announcement?.created_at
                ? new Date(announcement.created_at).toLocaleDateString(
                    'en-PH',
                    {
                      timeZone: 'Asia/Manila',
                    }
                  )
                : 'Date not available'}
            </p>
            <div className='flex w-full border-b-[1px] border-teal-inputf_border'></div>
          </div>
          <div className='flex gap-1 text-white-headline_titles_description w-full'>
            <p className='text-xs md:text-sm lg:text-lg'>
              {announcement?.content}
            </p>
          </div>
        </>
      )}
    </section>
  );
}
