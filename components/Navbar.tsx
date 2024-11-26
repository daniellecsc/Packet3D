'use client';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [isMobile, setIsMobile] = useState(false); // State to track screen size

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Update `isMobile` based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // `lg` breakpoint is 1024px in Tailwind
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen for window resize
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener
  }, []);

  return (
    <nav className='fixed flex justify-between w-full padding-container z-30 py-4 shadow-md bg-darkTeal-bgColor'>
      <Link href='/'>
        <Image src='/Logo.webp' width={110} height={50} alt='Logo' />
      </Link>

      {/* Desktop Menu */}
      {!isMobile && (
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
      )}

      {/* This is the button to redirect to the forum */}
      <a
        href='/' // Replace with your desired URL
        target='_blank'
        rel='noopener noreferrer'
        className='flex h-[30px] items-center justify-center gap-1 gradient-button gradient-button-hovered p-2 px-3 rounded-md text-darkTeal-bgColor text-sm font-semibold hover:text-white-headline_titles_description'
      >
        Go to Forum {'>'}
      </a>

      {/* Mobile Menu */}
      {isMobile && (
        <>
          <div
            className={`absolute top-16 right-2 h-auto bg-teal-panel_inactive rounded-lg shadow-md flex flex-col gap-1 py-2 px-2 w-[160px] transition-all duration-300 ease-in-out transform ${
              isOpen
                ? '-translate-x-0 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
          >
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

          {/* Hamburger Icon */}
          <div className='flex lg:hidden' onClick={toggleMenu}>
            <button className='text-white'>
              {isOpen ? (
                <RiCloseFill className='text-lg text-teal-navbar_active' />
              ) : (
                <HiOutlineMenu className='text-lg text-teal-navbar_active' />
              )}
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
