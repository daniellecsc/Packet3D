import Image from 'next/image';
import React from 'react';

export default function Team() {
  return (
    <section
      id='trailer'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row lg:gap-14 gap-6 px-10 lg:px-0 lg:pt-0 pt-28 justify-center items-center overflow-hidden flex-col'
    >
      <div className='lg:w-[30%] w-full z-10 px-10  xl:px-0'>
        <div className='text-[26px] md:text-[31px] lg:text-[40px] xl:text-[55px] font-bold text-teal-neongreen mb-7 drop-shadow-sm'>
          <h1>ENTER THE NETWORK</h1>
        </div>
        <div className='lg:text-[16px] font-normal text-justify text-white-headline_titles_description'>
          <p>
            Step into the immersive world of Packet3D, where every connection
            counts. Get ready to experience the thrill of network conquest like
            never before! <br /> <br />
            Are you ready to plug in and conquer?
          </p>
        </div>
      </div>

      <div className='flex flex-row z-10 relative h-[70%] lg:w-[55%] w-full lg:px-0 px-10 mt-12 lg:items-center items-start justify-center'>
        <div className='bg-black w-full h-[75%] lg:h-[100%] relative'>
          <div className='absolute left-5 top-[-30px] py-3 px-6 bg-gradient-to-r from-teal-navbar_active to-teal-neongreen rounded-md flex justify-center items-center'>
            <p className='text-darkTeal-bgColor font-bold lg:text-[18px] text-[15px] drop-shadow-2xl'>
              Packet3D Game
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
