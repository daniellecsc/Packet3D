import Image from 'next/image';
import React from 'react';

export default function AdminLogIn() {
  return (
    <section
      id='login'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row lg:gap-32 gap-6 lg:px-28 lg:pt-0 pt-28 justify-center items-center overflow-hidden flex-col '
    >
      <div className='about-map absolute inset-0 opacity-75 z-0' />
      <div className='relative flex font-bold text-white-headline_titles_description text-[30px] md:text-[40px] xl:text-[70px] justify-center items-center mt-14 xl:mt-10 drop-shadow-md'>
        Feedbacks and Suggestions
      </div>
    </section>
  );
}
