'use client';

import { AnnouncementCard } from './AnnouncementCard';
import React, { useEffect, useState } from 'react';
import { Announcement } from '@/app/lib/definitions';
import Image from 'next/image';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAnnouncements = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('/api/announcements');
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    fetchAnnouncements(); // Call the function correctly
  }, []);
  return (
    <section
      id='Announcements'
      className={`min-h-screen relative bg-darkTeal-bgColor flex justify-start gap-14 items-center flex-col px-20 py-10`}
    >
      <div className='relative flex font-bold text-white-headline_titles_description text-[30px] md:text-[40px] lg:text-[60px] justify-center items-center drop-shadow-md'>
        What's New?
      </div>
      <div className='w-full space-x-4 flex flex-row justify-between flex-grow'>
        <div className='w-1/2 relative'>
          {/* Blurred background */}
          <div className='absolute right-14 top-50 h-[250px] w-[400px] -translate-x-[30%] translate-y-[20%] -rotate-12 rounded-full bg-teal-navbar_active opacity-70 blur-[80px] z-10'></div>

          {/* Image positioned on top */}
          <Image
            src='/announce.webp'
            alt='megaphone'
            width={500}
            height={500}
            className='hidden lg:flex absolute inset-0 m-auto pb-20 z-20'
          />
        </div>
        <div className='w-1/2 h-[60vh] overflow-y-auto space-y-2'>
          {announcements.map((announcement, index) => {
            return (
              <AnnouncementCard
                key={index}
                title={announcement.title}
                id={announcement.id}
                date={
                  announcement.created_at
                    ? new Date(announcement.created_at).toLocaleDateString(
                        'en-PH',
                        {
                          timeZone: 'Asia/Manila',
                        }
                      )
                    : 'Date not available'
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
