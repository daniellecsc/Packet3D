import Image from 'next/image';
import React from 'react';

export default function Team() {
  return (
    <section
      id='trailer'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row lg:gap-32 gap-6 lg:px-28 lg:pt-0 pt-28 justify-center items-center overflow-hidden flex-col'
    >
      <div className='lg:w-[30%] w-full z-10 lg:px-0 px-10'>
        <div className='text-[26px] md:text-[31px] font-bold text-yellow-title mb-7 drop-shadow-sm'>
          <h1>ENTER THE NETWORK</h1>
        </div>
        <div className='lg:text-[16px] font-normal text-justify text-white-headline_titles_description'>
          <p>
            Step into the immersive world of Packet3D, where every connection
            counts. Get ready to experience the thrill of network conquest like
            never before! <br /> <br /> Are you ready to plug in and conquer?
          </p>
        </div>
      </div>

      <div className='flex flex-row z-10 relative h-[70%] lg:w-[70%] w-full lg:px-0 px-10 mt-12 lg:items-center items-start justify-center'>
        <div className='bg-black w-full h-[75%] lg:h-[100%] relative'>
          <div className='absolute left-5 top-[-30px] py-3 px-6 gradient-button2 rounded-md flex justify-center items-center'>
            <p className='text-white-headline_titles_description font-bold lg:text-[18px] text-[15px] drop-shadow-2xl'>
              Packet3D Game
            </p>
          </div>
        </div>
        {/* <Image
          src={'/BottomShadow.png'}
          alt={''}
          width={1000}
          height={50}
          className='absolute inset-x-0 bottom-40 md:bottom-5 lg:bottom-10 opacity-75'
        /> */}
      </div>
    </section>
  );
}
