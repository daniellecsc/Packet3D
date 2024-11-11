import { QueryResultRow } from '@vercel/postgres';
import React from 'react';
import FeedbackList from './feedbackList';
import ScrollToTopButton from './ScrollToTopButton';

export default function AdminFeedbackPage() {
  return (
    <section
      id='feedbackPage'
      className={`min-h-screen relative bg-darkTeal-bgColor flex justify-start gap-14 items-center flex-col`}
    >
      <div className='relative flex font-bold text-white-headline_titles_description text-[30px] md:text-[40px] lg:text-[60px] justify-center items-center mt-14 xl:mt-10 drop-shadow-md'>
        Feedbacks and Suggestions
      </div>

      <FeedbackList />
      <ScrollToTopButton />
    </section>
  );
}
