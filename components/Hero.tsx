import React from 'react';
import Link from 'next/link';
import { MdDownload } from 'react-icons/md';

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative bg-darkTeal-bgColor padding-container h-lvh flex flex-col gap-16 py-10 pb-32 lg:py-20 justify-center items-center overflow-hidden'
    >
      <div className='hero-map2 absolute inset-0 opacity-100 z-0' />
      {/* <div className='absolute inset-0 z-0 h-full w-full [background:radial-gradient(95%_100%_at_50%_10%,#031C22_40%,#2DD3FF_100%)]'></div> */}
      <div className='hero-map absolute inset-0 opacity-10 z-0' />

      <div className='relative w-full flex justify-center items-center flex-col gap-6 text-white-headline_titles_description z-10'>
        <h1 className='drop-shadow-lg font-bold text-[39px] sm:text-[47px] md:text-[57px] lg:text-[69px] xl:text-[78px] leading-[130%] text-center mt-36 lg:mt-16'>
          Unleash the Power of
          <br />{' '}
          <span className='bg-gradient-to-r from-teal-navbar_active to-teal-neongreen bg-clip-text text-transparent'>
            Networks In Virtual Reality
          </span>
        </h1>

        <p className='font-normal text-[16px] mt-4 text-center text-white-subheading_details'>
          Immerse yourself in the world of networking with our groundbreaking
          gaming app. <br className='hidden md:block' />
          Experience the intricacies of packet tracing in virtual reality, where
          learning meets innovation. <br className='hidden md:block' />
          Unleash the potential of virtual reality for a dynamic and engaging
          game experience in the realm of packet tracing.
        </p>
      </div>

      <div className='relative z-20 w-full flex justify-center'>
        <Link
          href='#downloadp'
          className='bg-gradient-to-r from-teal-navbar_active to-teal-neongreen p-4 rounded-2xl text-darkTeal-bgColor font-semibold flex flex-row w-full sm:w-[250px] justify-center items-center gap-2 hover:translate-y-[-5px]'
        >
          <MdDownload className='text-center text-2xl' />
          Download Packet3D
        </Link>
      </div>
    </section>
  );
}
