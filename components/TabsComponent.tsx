'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Tab {
  link: string;
  label: string;
  routes: string[]; // Array of routes that should activate this tab
}

export default function Tabs({
  orientation = 'row',
  tabs = [],
}: {
  orientation: 'vertical' | 'row';
  tabs: Tab[];
}) {
  const pathname = usePathname(); // Using usePathname to get the current path

  return (
    <div
      className={`${
        orientation === 'row'
          ? 'flex w-full border-b-[1px] border-teal-inputf_border space-x-4' // Border on the bottom for row orientation with horizontal spacing
          : 'flex flex-col h-[600px] border-r-[1px] border-teal-inputf_border space-y-2 w-[250px]' // Border on the right for vertical orientation with vertical spacing
      } p-2 bg-transparent`}
    >
      {tabs.map((tab) => {
        // Check if the current tab is active by checking if the pathname matches any route in the tab's routes array
        const isActive = tab.routes.includes(pathname);

        return (
          <Link
            key={tab.link} // Make sure to add a `key` for each element
            href={tab.link}
            className={`p-1 ${
              isActive
                ? 'text-white-headline_titles_description font-bold'
                : 'text-gray-500'
            } transition-all flex items-start`} // Aligned to start for consistent vertical alignment
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
