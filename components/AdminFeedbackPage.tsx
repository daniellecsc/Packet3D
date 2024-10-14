import { QueryResultRow } from '@vercel/postgres';
import Image from 'next/image';
import React from 'react';
import FeedbackList from './feedbackList';
import ButtonSignOut from './signOut';

export default function AdminFeedbackPage({
  feedbacks,
}: {
  feedbacks: QueryResultRow[];
}) {
  return (
    <section
      id='feedbackPage'
      className={`relative bg-darkTeal-bgColor flex px-20 lg:py-20 pt-28 justify-start gap-14 items-center flex-col ${
        feedbacks.length > 2 ? 'h-fit' : 'h-lvh'
      }`}
    >
      <div className='w-full flex justify-end fixed z-50 top-0 px-3 py-3 bg-darkTeal-bgColor shadow-md'>
        <ButtonSignOut />
      </div>
      <div className='about-map absolute inset-0 opacity-100 z-0' />
      <div className='relative flex font-bold text-white-headline_titles_description text-[30px] md:text-[40px] lg:text-[60px] justify-center items-center mt-14 xl:mt-10 drop-shadow-md'>
        Feedbacks and Suggestions
      </div>
      {/* Feedback list */}
      <FeedbackList />
    </section>
  );
}
