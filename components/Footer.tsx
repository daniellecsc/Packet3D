import Image from 'next/image';
import React from 'react';

//FINISH PUTTING THE CONTENTS FIRST BEFORE APPLYING THE RESPONSIVENESS AND ANIMATIONS

export default function Hero() {
  return (
    <section className='relative bg-darkTeal-bgColor padding-container h-[200px] flex flex-col gap-20 py-10 pb-32 md:gap-13 lg:py-20 justify-center items-center overflow-hidden'>
      <div className='relative w-full flex justify-center items-center flex-col'>
        <Image
          src='/Logo2.png'
          alt='logo2'
          width={40}
          height={40}
          className='mt-20 lg:mt-2'
        />
        <h1 className='font-regular text-[16px] text-white-subheading_details italic mt-4'>
          Packet3D
        </h1>
        <p className='font-bold text-[16px] text-white-subheading_details mt-4'>
          Copyright © 2023 | All Rights Reserved
        </p>
      </div>
    </section>
  );
}
