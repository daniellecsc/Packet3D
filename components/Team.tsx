'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type Card = {
  id: number;
  order: number;
  nickname: string;
  fullName: string;
  position: string;
  email: string;
  number: string;
  bgUrl: string;
};

export function Picker({
  id,
  order,
  fullName,
  position,
  nickname,
  email,
  number,
  bgUrl,
}: Card) {
  const [active, setActive] = useState(false);

  return (
    <>
      <div
        className={`relative w-1 xl:flex flex-col flex-1 rounded-md h-full hidden bg-white-panels z-20 transition-all duration-custom-duration ease-custom-ease hover:bg-teal-panel_active overflow-hidden`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      >
        {active && (
          <div className='w-full h-full flex flex-row items-center justify-start text-white-headline_titles_description'>
            <div className='w-1/2'></div>
            <div className='w-1/2 flex flex-col justify-center items-center text-center mr-12 delay-300'>
              <p className='font-bold text-[40px] 2xl:text-[43px] drop-shadow-md text-teal-inputf_bg'>
                {nickname}
              </p>
              <p className='text-white-panels'>
                ____________________________________________
              </p>
              <p className='font-medium text-[20px] 2xl:text-[22px] mt-5 drop-shadow-md'>
                {fullName}
              </p>
              <p className='font-normal text-[13px] 2xl:text-[15px] italic drop-shadow-md'>
                {position}
              </p>
              <p className='font-normal text-[13px] 2xl:text-[15px] mt-7 drop-shadow-md'>
                {email}
              </p>
              <p className='font-normal text-[13px] 2xl:text-[15px] drop-shadow-md'>
                {number}
              </p>
            </div>
          </div>
        )}
      </div>
      <div
        className='xl:hidden p-2 py-2 flex items-end w-full h-[150px] sm:h-[200px] md:h-[250px] bg-teal-panel_active rounded-md shadow-md hover:none'
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      >
        <div className='p-3 w-full h-[50%] sm:h-[45%] bg-white-panels rounded-md shadow-xl flex flex-col justify-center items-center'>
          <p className='font-bold text-[10px] sm:text-sm md:text-base lg:text-lg drop-shadow-md text-teal-inputf_bg'>
            {nickname}
          </p>
          <p className='font-medium text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs drop-shadow-md text-teal-inputf_bg'>
            {fullName}
          </p>
          <p className='font-medium text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs drop-shadow-md text-teal-inputf_bg'>
            {position}
          </p>
          <p className='font-medium text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs drop-shadow-md text-teal-inputf_bg'>
            {email}
          </p>
          <p className='font-medium text-[7px] sm:text-[9px] md:text-[11px] lg:text-xs drop-shadow-md text-teal-inputf_bg'>
            {number}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Team() {
  const [items, setItems] = useState<Card[]>([
    {
      id: 1,
      order: 1,
      nickname: 'Zy',
      fullName: 'Zyrille Nichole V. Quilit',
      position: 'Back-end Developer',
      email: 'zyrillenicholequilit@gmail.com',
      number: '09955637401',
      bgUrl: '/ZyBG.png',
    },
    {
      id: 2,
      order: 2,
      nickname: 'Therese',
      fullName: 'Marie Therese S. Gaspar',
      position: 'Quality Assurance Tester',
      email: 'thereseegaspar@gmail.com',
      number: '09388336086',
      bgUrl: '/TereBG.png',
    },
    {
      id: 3,
      order: 3,
      nickname: 'Ivan',
      fullName: 'Ivan Gonzales',
      position: 'Front-end Developer',
      email: 'itsivang@gmail.com',
      number: '09330493325',
      bgUrl: '/IvanBG.png',
    },
    {
      id: 4,
      order: 4,
      nickname: 'Dan',
      fullName: 'Danielle Claudette S. Castañeda',
      position: 'Front-end Developer | UI/UX Designer',
      email: 'danielleclaudettecastaneda@gmail.com',
      number: '09756690321',
      bgUrl: '/DanBG.png',
    },
    {
      id: 5,
      order: 5,
      nickname: 'Hanah',
      fullName: 'Hanah Mae V. Espineda',
      position: 'Project Documentation Leader',
      email: 'hanahmaeespineda@gmail.com',
      number: '09363483144',
      bgUrl: '/HanahBG.png',
    },
  ]);

  const switchWithOrder3 = (clickedId: number) => {
    setItems((prevItems) => {
      const itemWithOrder3 = prevItems.find((item) => item.order === 3);
      const clickedItem = prevItems.find((item) => item.id === clickedId);

      if (!itemWithOrder3 || !clickedItem || clickedItem.order === 3)
        return prevItems;

      return prevItems.map(
        (item) =>
          item.id === clickedItem.id
            ? { ...item, order: 3, isActive: true }
            : item.id === itemWithOrder3.id
            ? { ...item, order: clickedItem.order, isActive: false }
            : { ...item, isActive: false } // Ensure other items are inactive
      );
    });
  };

  return (
    <section
      id='team'
      className='relative bg-darkTeal-bgColor h-fit xl:h-[calc(110lvh)] flex p-10 xl:px-20 flex-col gap-5 xl:gap-16 xl:pb-32 xl:py-20 overflow-hidden'
    >
      <div className='team-map2 absolute inset-0 opacity-75 z-0' />
      <div className='relative flex font-bold text-white-headline_titles_description text-[30px] md:text-[40px] xl:text-[70px] justify-center items-center mt-14 xl:mt-10 drop-shadow-md'>
        Meet the Team
      </div>

      <div className='team-container w-full h-full xl:flex items-center flex-row gap-5 hidden'>
        {items
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <Picker
              key={item.id}
              id={item.id}
              order={item.order}
              nickname={item.nickname}
              fullName={item.fullName}
              position={item.position}
              email={item.email}
              number={item.number}
              bgUrl={item.bgUrl}
            />
          ))}
      </div>
      <div className='team-container w-full h-full grid-cols-1 grid sm:grid-cols-3 gap-5 xl:hidden'>
        {items
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <Picker
              key={item.id}
              id={item.id}
              order={item.order}
              nickname={item.nickname}
              fullName={item.fullName}
              position={item.position}
              email={item.email}
              number={item.number}
              bgUrl={item.bgUrl}
            />
          ))}
      </div>
    </section>
  );
}
