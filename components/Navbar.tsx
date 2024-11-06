'use client';
import { useState } from 'react';
import { NAV_LINKS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className='fixed flex justify-between w-full padding-container z-30 py-4 shadow-md bg-darkTeal-bgColor'>
      <Link href='/'>
        <Image src='/Logo.webp' alt='logo' width={110} height={50} />
      </Link>

      {/* Desktop Menu */}
      <ul className='justify-center hidden h-full gap-12 lg:flex'>
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className='flexCenter text-[17px] text-white-subheading_details font-semibold cursor-pointer pb-1.5 transition-all hover:font-semibold hover:text-teal-navbar_active'
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu with Left-to-Right Animation */}
      <div
        className={`absolute top-16 right-2 h-auto bg-teal-panel_inactive rounded-lg shadow-md lg:hidden flex flex-col gap-1 py-2 px-2 w-[160px] transition-all duration-300 ease-in-out transform ${
          isOpen ? '-translate-x-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* <div className='w-full flex justify-end'>
          <button className='text-white' onClick={toggleMenu}>
            <RiCloseFill className='text-lg text-teal-navbar_active' />
          </button>
        </div> */}

        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className='block text-[17px] text-white-subheading_details font-semibold cursor-pointer py-1 p-3 transition-all hover:font-semibold active:bg-teal-inputf_bg w-full rounded-md'
            onClick={() => setIsOpen(false)} // Close the menu on link click
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className='w-[110px]' />

      {/* Hamburger Icon for Mobile View */}
      <div className='flex lg:hidden' onClick={toggleMenu}>
        <button className='text-white'>
          {isOpen ? (
            <RiCloseFill className='text-lg text-teal-navbar_active' />
          ) : (
            <HiOutlineMenu className='text-lg text-teal-navbar_active' />
          )}
        </button>
      </div>
    </nav>
  );
}
