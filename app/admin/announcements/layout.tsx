import AdminFeedbackPage from '@/components/AdminFeedbackPage';
import Tabs from '@/components/TabsComponent';
export const fetchCache = 'force-no-store';

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    {
      link: '/admin/announcements/edit',
      label: 'All Announcements',
      routes: ['/admin/announcements/edit'],
    },
    {
      link: '/admin/announcements/createAnnouncement',
      label: 'Create Announcement',
      routes: ['/admin/announcements/createAnnouncement'],
    },
  ];

  return (
    <section
      id='feedbackPage'
      className='min-h-screen relative bg-darkTeal-bgColor flex flex-col items-center'
    >
      <div className='relative flex font-bold text-white-headline_titles_description text-[30px] md:text-[40px] lg:text-[60px] justify-center items-center mt-14 xl:mt-10 drop-shadow-md'>
        Announcements
      </div>
      <div className='w-full overflow-x-auto'>
        <div className='min-w-[1000px] w-full flex flex-row justify-between items-start h-[800px] gap-2'>
          <Tabs orientation={'vertical'} tabs={tabs} />
          <div className='relative overflow-hidden p-2 h-full w-full flex items-start justify-start'>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
