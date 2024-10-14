import { signOut } from '@/auth';
import Link from 'next/link';
import { PiSignOutBold } from 'react-icons/pi';

export default async function ButtonSignOut({
  className,
}: {
  className?: string;
}) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button
        className={`flex h-[30px] grow items-center justify-center gap-1 gradient-button gradient-button-hovered p-2 px-3 rounded-md text-darkTeal-bgColor text-sm font-semibold ${className}`}
      >
        <PiSignOutBold className='w-6' />
        <div className='hidden md:block'>Sign Out</div>
      </button>
    </form>
  );
}
