import { RiDeleteBinLine } from 'react-icons/ri';

interface CardProps {
  name: string;
  email: string;
  feedback: string;
  id: string;
  createdat: string;
  // onDelete: (id: string) => void;
}

export default function FeedbackCard({
  name,
  email,
  feedback,
  id,
  createdat,
}: // onDelete,
CardProps) {
  return (
    <div className='bg-white-panels/15 backdrop-blur-sm shadow-md w-full flex flex-col lg:w-[100%] h-auto rounded-2xl p-2 relative overflow-hidden z-20 gap-2 md:gap-0 transition-all duration-200 ease-in-out'>
      <div className='w-full rounded-lg p-3'>
        {/* Top section: Name and Email with border below */}
        <div className='flex justify-between items-center pb-2 mb-6 border-b border-white-lightgray_desc'>
          <div>
            <p className='text-teal-navbar_active text-md font-bold'>{name}</p>
            <p className='text-white-inactive_titles_desc font-normal text-sm'>
              {email}
            </p>
          </div>
          {/* <div className='bg-red-700 p-1 px-4 rounded-md hover:bg-red-900'>
            <button
              onClick={() => onDelete(id)} // Call onDelete function
              className='flex flex-row gap-2 text-white-panels text-sm transition duration-200 ease-in-out transform items-center'
            >
              <RiDeleteBinLine />
              <p className='text-sm'>Delete</p>
            </button>
          </div> */}
        </div>

        {/* Bottom section: Feedback/Suggestion */}
        <div>
          <div className='flex justify-between'>
            <p className='text-base font-bold text-white-headline_titles_description'>
              Feedback/Suggestion:
            </p>
          </div>
          <div className='flex justify-between text-base'>
            <p className='text-white-subheading_details'>{feedback}</p>
          </div>
          <div className='absolute bottom-0 right-0 text-xs text-gray-500 p-5'>
            <p>Submitted on: {createdat}</p> {/* Display the submission date */}
          </div>
        </div>
      </div>
    </div>
  );
}
