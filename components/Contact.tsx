import Image from 'next/image';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';

//FINISH PUTTING THE CONTENTS FIRST BEFORE APPLYING THE RESPONSIVENESS AND ANIMATIONS

export default function Contact() {
  return (
    <section
      id='contact'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row flex-col gap-5 lg:px-24 py-10 pb-32 lg:py-12 justify-center items-center overflow-hidden'
    >
      <div className='contact-map absolute inset-0 opacity-100 z-0' />

      <div className='relative lg:w-[60%] w-full z-10 flex justify-start items-start flex-col mt-56 md:mt-56 lg:mt-16 lg:px-0 px-10'>
        <div className='relative flex flex-col w-full justify-start lg:items-start items-center text-center lg:text-start'>
          <h1 className='text-white-headline_titles_description font-bold text-[40px] md:text-[55px] 2xl:text-[70px] leading-[100%] drop-shadow-md'>
            Get in touch with us!
          </h1>
          <p className='text-white-lightgray_desc font-normal text-[16px]'>
            Let us know about your experience!
          </p>
        </div>

        <div className='relative flex flex-col justify-center lg:justify-start items-start w-full'>
          <form
            action=''
            className='flex flex-col gap-3 mt-11 w-full items-center lg:items-start'
          >
            <input
              type='text'
              className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Name'
            />
            <input
              type='text'
              className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Email'
            />
            <textarea
              id='message'
              name='message'
              className='w-[300px] md:w-[370px] h-[130px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Message'
            ></textarea>
            <button
              type='submit'
              className='gradient-button gradient-button-hovered p-4 rounded-md text-darkTeal-bgColor font-semibold flex flex-row w-[300px] md:w-[370px] h-[50px] justify-center items-center gap-2 mt-3'
            >
              Submit
            </button>
          </form>
        </div>

        <div className='flex flex-col mt-10 w-full justify-start lg:items-start items-center'>
          <p className='w-[300px] md:w-[370px] lg:w-auto text-white-subheading_details font-bold text-[16px]'>
            Find us on:
          </p>

          <div className='flex flex-row gap-3 mt-1 w-[300px] md:w-[370px] lg:w-auto '>
            <a href='https://www.facebook.com/profile.php?id=61565802862968&mibextid=LQQJ4d'>
              <FaFacebook className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
            </a>
            <a href='https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fpacket3d%3Figsh%3DMWN4MmhtMm9kdHFvdQ%253D%253D&h=AT1w91p3n7ILZt1ZYj3BPZgvSZEYOmIDcImY2PbeIHkLMI1pTOu7Mvn__Y-kUEcfyLTR2lTi-F4IHyYz0tpiUHH0gT8pWn0k54qJ8bbLqor62qlZ25IBwG0f4fej0wwksh21FA'>
              <RiInstagramFill className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
            </a>
            <a href='https://l.messenger.com/l.php?u=https%3A%2F%2Fx.com%2Fpacket3d%3Fs%3D21&h=AT1w91p3n7ILZt1ZYj3BPZgvSZEYOmIDcImY2PbeIHkLMI1pTOu7Mvn__Y-kUEcfyLTR2lTi-F4IHyYz0tpiUHH0gT8pWn0k54qJ8bbLqor62qlZ25IBwG0f4fej0wwksh21FA'>
              <FaSquareXTwitter className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
            </a>
            <a className='ml-4 md:ml-20 flex'>
              <BiLogoGmail className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
              <p className='text-white-subheading_details font-normal text-[13px] ml-1'>
                teampacket3d@gmail.com
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className='relative flex flex-row z-10 lg:w-[50%] w-full mt-14'>
        <Image
          src='/Envelope.png'
          alt='envelope'
          width={600}
          height={600}
          className='hidden lg:flex'
        />
      </div>
    </section>
  );
}
