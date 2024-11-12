import Link from 'next/link';
import { RiDeleteBinLine } from 'react-icons/ri';

interface CardProps {
  id?: string;
  title?: string;
  date?: string;
}

export function AnnouncementCard({
  id,
  title,
  date,
}: // onDelete,
CardProps) {
  return (
    <div className='bg-teal-inputf_bg shadow-md w-full flex flex-col h-auto rounded-lg relative overflow-hidden gap-2 md:gap-0 transition-all duration-200 ease-in-out'>
      <div className='w-full rounded-lg p-3 px-5'>
        {/* Top section */}
        <div className='flex justify-between'>
          <div>
            <p className='text-white-headline_titles_description text-xl font-bold'>
              {title}
            </p>
            <p className='text-xs text-gray-500 font-normal'>{date}</p>
          </div>
        </div>
      </div>

      {/* Bottom right "learn more" link */}
      <div className='flex justify-end p-3 px-5 mt-auto'>
        <Link href={`/announcements/${id}`}>
          <p className='text-teal-navbar_active text-sm font-normal hover:text-white-headline_titles_description'>
            Click here to learn more{' →'}
          </p>
        </Link>
      </div>
    </div>
  );
}

export function AdminAnnouncementCard({
  title = 'title',
  createdAt = 'createdAt',
  announcementId,
  onClick,
  isActive,
}: {
  title: string;
  createdAt: string;
  announcementId: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <div
      className={`shadow-md  w-full rounded-md p-4 relative ${
        isActive ? 'bg-teal-inputf_bg' : 'bg-white-panels/15 backdrop-blur-sm'
      }`}
    >
      <p className='text-teal-navbar_active text-xl font-bold'>{title}</p>
      <p className='text-xs text-gray-500 font-normal'>
        Posted at: {createdAt}
      </p>
      <div className='flex justify-end'>
        <button
          className='text-teal-navbar_active text-sm font-normal hover:text-white-panels'
          onClick={onClick}
        >
          See details {'→'}
        </button>
      </div>
    </div>
  );
}
