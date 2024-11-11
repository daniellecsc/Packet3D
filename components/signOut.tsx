'use client'; // Explicitly mark this as a client component

import { signOut } from 'next-auth/react';
import { PiSignOutBold } from 'react-icons/pi';

export default function ButtonSignOut({ className }: { className?: string }) {
  return (
    <div>
      <button
        onClick={() => signOut({ callbackUrl: '/adminLogin' })} // Handle sign-out on click
        className={`flex h-[30px] items-center justify-center gap-1 gradient-button gradient-button-hovered p-2 px-3 rounded-md text-darkTeal-bgColor text-sm font-semibold ${className}`}
      >
        <PiSignOutBold className='w-6' />
        <div className='hidden md:block'>Sign Out</div>
      </button>
    </div>
  );
}
