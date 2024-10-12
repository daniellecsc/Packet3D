interface cardProps {
  name: string;
  email: string;
  feedback: string;
}

export default function FeedbackCard({ name, email, feedback }: cardProps) {
  return (
    <div className='bg-white-panels/15 backdrop-blur-sm hover:bg-white-panels/25 shadow-md w-full flex flex-col lg:w-[100%] h-auto rounded-2xl p-4 lg:p-4 relative overflow-hidden z-20 gap-2 md:gap-0 transition-all duration-200 ease-in-out'>
      <div className='w-full rounded-lg p-3'>
        {/*Top section: Name and Email with border below*/}
        <div className='flex justify-between items-center pb-2 mb-6 border-b border-white-lightgray_desc'>
          <div>
            <p className='text-teal-navbar_active text-md font-bold'>{name}</p>
            <p className='text-white-inactive_titles_desc font-normal text-sm'>
              {email}
            </p>
          </div>
        </div>

        {/*Bottom section: Feedback/Suggestion*/}
        <div>
          <div className='flex justify-between'>
            <p className='text-md font-bold text-white-headline_titles_description'>
              Feedback/Suggestion:
            </p>
          </div>
          <div className='flex justify-between text-base'>
            <p className='text-white-subheading_details'>{feedback}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
