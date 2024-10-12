import Link from 'next/link';
import { signOut } from '@/auth';
import { PiSignOutBold } from 'react-icons/pi';

export default function ButtonSignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
        <PiSignOutBold className='w-6' />
        <div className='hidden md:block'>Sign Out</div>
      </button>
    </form>
  );
}
