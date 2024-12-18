import Link from 'next/link';
import { BsHeadsetVr } from 'react-icons/bs';
import { FaWindows } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';

interface cardProps {
  icon: React.ReactNode;
  os: string;
  description: string;
  href: string;
}

function Card({ icon, os, description, href }: cardProps) {
  return (
    <div className='bg-white-panels/15 backdrop-blur-sm hover:bg-white-panels/25 hover:border hover:border-teal-navbar_active cursor-pointer hover:shadow-[0px_0px_30px_5px_rgba(45,211,255,0.30)] w-full flex flex-col lg:w-[360px] lg:h-[280px] md:h-[250px] rounded-2xl p-4 lg:p-4 relative md:w-[280px] overflow-hidden z-20 gap-10 md:gap-0 transition-all duration-300 ease-in-out'>
      <div className='w-full'>
        <div className='flex justify-center items-center h-14 w-14 rounded-full bg-teal-panel_inactive shadow-md hover:shadow-2xl'>
          {icon}
        </div>
      </div>
      <div className='w-full md:mt-8'>
        <h1 className='font-semibold text-[20px] text-white-panels'>{os}</h1>
        <p className='font-normal text-white-panels text-xs'>{description}</p>
      </div>
      <div className='w-full flex items-end flex-grow'>
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex gap-2 hover:bg-white-inactive_titles_desc bg-white-panels px-4 py-2 rounded-3xl font-semibold text-sm shadow-md'
        >
          <MdDownload className='text-center text-lg' /> Download
        </a>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <section
      id='downloadp'
      className='relative bg-darkTeal-bgColor padding-container md:h-lvh h-fit flex flex-col gap-16 py-10 pb-32 lg:py-20 justify-center items-center overflow-hidden'
    >
      <div className='hero-map2 absolute inset-0 opacity-100 z-0' />
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#1eedd920_1px,transparent_1px),linear-gradient(to_bottom,#1eedd920_1px,transparent_1px)] bg-[size:60px_80px] [mask-image:radial-gradient(ellipse_60%_95%_at_50%_0%,#000_70%,transparent_100%)]' />

      <div className='relative w-full flex justify-center items-center flex-col gap-3 z-10'>
        <h1 className='drop-shadow-lg font-bold text-[39px] sm:text-[47px] lg:text-[57px] xl:text-[78px] leading-[130%] text-center mt-36 lg:mt-16 bg-gradient-to-r from-teal-navbar_active to-teal-neongreen bg-clip-text text-transparent'>
          Download Packet3D Now
        </h1>

        <p className='font-normal text-[16px] text-center text-white-subheading_details drop-shadow-lg'>
          Packet3D is now available in Windows and Meta Quest 2
        </p>
      </div>

      <div className='relative w-full flex justify-center items-center gap-10 z-10 mt-2 md:flex-row flex-col'>
        <Card
          icon={
            <FaWindows className='text-center text-2xl text-white-panels drop-shadow-lg' />
          }
          os={'Windows'}
          description={'Download Packet3D for Windows'}
          href={
            'https://drive.google.com/drive/folders/1_Ti0kmAjPzZ0WibFtWSmQtD4vOe6OswE?usp=sharing'
          }
        />
        <Card
          icon={
            <BsHeadsetVr className='text-center text-2xl text-white-panels drop-shadow-lg' />
          }
          os={'Meta Quest 2'}
          description={'Download Packet3D for Meta Quest 2'}
          href={
            'https://drive.google.com/drive/folders/1_Ti0kmAjPzZ0WibFtWSmQtD4vOe6OswE?usp=sharing'
          }
        />
      </div>
    </section>
  );
}
