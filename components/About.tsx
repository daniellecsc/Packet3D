'use client';

import Image from 'next/image';
import React from 'react';

// Card component definition
export function Card({
  isActive,
  icon,
  title,
  content,
}: {
  isActive: boolean;
  icon: string;
  title: string;
  content: string;
}) {
  return (
    <>
      {isActive ? (
        <div
          className='bg-teal-panel_active flex justify-center items-center flex-col
          lg:w-[370px] lg:h-[550px] md:h-[450px] rounded-2xl p-6 lg:p-8 
          relative md:w-[250px] overflow-hidden z-20 '
        >
          <div className='h-[70px] w-[70px] lg:h-[110px] lg:w-[110px] relative hidden md:flex'>
            <Image
              src={icon}
              alt='active-icon'
              layout='fill'
              objectFit='contain'
            />
          </div>

          <h1 className='lg:text-[31px] md:text-[24px] text-[20px] leading-7 text-center font-bold text-white-headline_titles_description drop-shadow-md md:mt-7'>
            {title}
          </h1>
          <p className='lg:text-[16px] text-[13px] text-justify font-normal text-white-headline_titles_description drop-shadow-md mt-5'>
            {content}
          </p>
        </div>
      ) : (
        <div
          className='border-2 border-teal-navbar_active/15 md:bg-gradient-to-br from-teal-panel_inactive to-darkTeal-bgColor backdrop-blur-sm flex justify-center items-center flex-col
          lg:w-[370px] lg:h-[460px] md:h-[400px] rounded-2xl p-6 lg:p-8
          relative w-full overflow-hidden md:w-[250px] z-10 transition-all duration-300 ease-in-out md:opacity-60 opacity-100 bg-teal-panel_active'
        >
          <div className='h-[70px] w-[70px] lg:h-[110px] lg:w-[110px] relative hidden md:flex'>
            <Image
              src={icon}
              alt='active-icon'
              layout='fill'
              objectFit='contain'
            />
          </div>

          <h1 className='lg:text-[31px] md:text-[24px] text-[20px] leading-7 text-center font-bold text-white-headline_titles_description drop-shadow-md md:mt-7'>
            {title}
          </h1>
          <p className='lg:text-[16px] text-[13px] text-justify font-normal text-white-headline_titles_description drop-shadow-md mt-5'>
            {content}
          </p>
        </div>
      )}
    </>
  );
}
export default function About() {
  const [activeIndex, setActiveIndex] = React.useState(1);

  const nextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    console.log(activeIndex);
  };

  const prevCard = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        return 2; // Return 2 instead of 3 since the indices are 0, 1, 2
      } else {
        return (prevIndex - 1) % 3;
      }
    });
  };

  return (
    <section
      id='about'
      className='relative bg-darkTeal-bgColor h-lvh flex flex-col md:flex-row justify-center items-center gap-2 overflow-hidden pt-16 px-10 md:px-10'
    >
      <div className='about-map absolute inset-0 opacity-100 z-0' />

      <Card
        isActive={activeIndex === 0}
        icon='/Mission.png'
        title='Our Mission'
        content='Packet3D was developed to provide an innovative and interactive learning experience for every student and professor, providing exceptional hands-on activity in the virtual world, and improving the knowledge regarding computer networking.'
      />
      <Card
        isActive={activeIndex === 1}
        icon='/MagnifyingGlass.png'
        title='What is Packet3D?'
        content='Packet3D offers a virtual reality experience where players delve into the world of networking challenges. They encounter different network topologies and solve networking problems and puzzles that encompass real networking experience as they progress through various levels in an immersive 3D environment.'
      />
      <Card
        isActive={activeIndex === 2}
        icon='/Vision.png'
        title='Our Vision'
        content='Packet3D envisions in becoming a breakthrough application utilizing virtual reality to simulate network connections, resolve troubleshooting, furnish routing protocols, packet optimization, and learn configuration commands.'
      />

      <button
        onClick={prevCard}
        className='absolute 2xl:left-20 md:left-1 z-30 rounded-lg opacity-100 hover:opacity-100 rotate-180 md:w-[50px] md:h-[50px] xl:w-[80px] xl:h-[80px]'
      >
        <Image
          src={'/NextButton.png'}
          alt='inactive-icon'
          layout='fill'
          objectFit='contain'
        />
      </button>

      <button
        onClick={nextCard}
        className='absolute 2xl:right-20 md:right-1 z-30 rounded-lg opacity-100 hover:opacity-100 md:w-[50px] md:h-[50px] xl:w-[80px] xl:h-[80px]'
      >
        <Image
          src={'/NextButton.png'}
          alt='inactive-icon'
          layout='fill'
          objectFit='contain'
        />
      </button>
    </section>
  );
}
