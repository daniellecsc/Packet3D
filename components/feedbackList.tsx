'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FeedbackCard from './feedbackCard';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { IoMdSearch } from 'react-icons/io';

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterType, setFilterType] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [deleteId, setDeleteId] = useState<string | null>(null);
  const pathname = usePathname();

  const fetchFeedbacks = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('/api/submit');
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     const response = await fetch(`/api/submit?id=${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Error deleting feedback:', errorData);
  //       throw new Error('Failed to delete feedback');
  //     }

  //     setFeedbacks((prevFeedbacks) =>
  //       prevFeedbacks.filter((feedback) => feedback.id !== id)
  //     );
  //     setIsDialogOpen(false);
  //   } catch (error) {
  //     console.error('Error deleting feedback:', error);
  //   }
  // };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const feedbackDate = new Date(feedback.createdat);
    const isMatchingSearch = feedback.feedback
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isMatchingYear = yearFilter
      ? feedbackDate.getFullYear() === parseInt(yearFilter)
      : true;
    const isMatchingMonth = monthFilter
      ? feedbackDate.getMonth() + 1 === parseInt(monthFilter)
      : true;

    return isMatchingSearch && isMatchingYear && isMatchingMonth;
  });

  const sortFeedbacks = (feedbacks: any[]) => {
    return feedbacks.sort((a, b) => {
      const dateA = new Date(a.createdat);
      const dateB = new Date(b.createdat);

      switch (sortOption) {
        case 'newest':
          return dateB.getTime() - dateA.getTime();
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        default:
          return 0;
      }
    });
  };

  const sortedFeedbacks = sortFeedbacks(filteredFeedbacks);

  return (
    <div className='w-full flex justify-center items-center text-white-panels text-xl flex-col gap-8'>
      {/* Search and Filters container */}
      <div className='w-full flex flex-col md:flex-row justify-between items-center gap-2'>
        {/* Search bar */}
        <div className='relative flex items-center w-full sm:w-auto'>
          <IoMdSearch className='absolute left-2 text-white-subheading_details' />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search feedback'
            className='w-full sm:w-auto h-[40px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-lightgray_desc rounded-md shadow-md p-2 pl-9'
          />
        </div>

        {/* Filters and Sort container */}
        <div className='w-full sm:w-auto flex flex-col sm:flex-row gap-2'>
          {/* Sort by Newest/Oldest */}
          <div className='relative flex items-center '>
            <BiSortAlt2 className='absolute left-2 text-white-subheading_details cursor-pointer' />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className='cursor-pointer w-full sm:w-auto h-[40px] border border-teal-inputf_border text-white bg-teal-inputf_bg rounded-md p-2 pl-9 text-[16px] text-white-subheading_details'
            >
              <option
                value=''
                className='text-[16px] text-white-subheading_details cursor-pointer'
              >
                Sort
              </option>
              <option
                value='newest'
                className='text-[16px] text-white-subheading_details cursor-pointer'
              >
                Newest
              </option>
              <option
                value='oldest'
                className='text-[16px] text-white-subheading_details cursor-pointer'
              >
                Oldest
              </option>
            </select>
          </div>

          {/* Filter type (Year or Month) */}
          <div className='relative flex items-center'>
            <FiFilter className='absolute left-2 text-white-subheading_details cursor-pointer' />
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setYearFilter('');
                setMonthFilter('');
              }}
              className='cursor-pointer w-full sm:w-auto h-[40px] border border-teal-inputf_border text-white bg-teal-inputf_bg rounded-md p-2 pl-9 text-[16px] text-white-subheading_details'
            >
              <option
                value=''
                className='text-[16px] text-white-subheading_details cursor-pointer'
              >
                Filter by date
              </option>
              <option
                value='year'
                className='text-[16px] text-white-subheading_details cursor-pointer'
              >
                Filter by Year
              </option>
              <option
                value='month'
                className='text-[16px] text-white-subheading_details cursor-pointer'
              >
                Filter by Month
              </option>
            </select>
          </div>

          {/* Year filter */}
          {filterType === 'year' && (
            <div className='relative flex items-center'>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className='cursor-pointer w-full sm:w-auto h-[40px] border border-teal-inputf_border text-white bg-teal-inputf_bg rounded-md p-2 text-[16px] text-white-subheading_details'
              >
                <option
                  value=''
                  className='text-[16px] text-white-subheading_details cursor-pointer'
                >
                  All Years
                </option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option
                      key={year}
                      value={year}
                      className='text-[16px] text-white-subheading_details cursor-pointer'
                    >
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Month filter */}
          {filterType === 'month' && (
            <div className='relative flex items-center'>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className='cursor-pointer w-full sm:w-auto h-[40px] border border-teal-inputf_border text-white bg-teal-inputf_bg rounded-md p-2 text-[16px] text-white-subheading_details'
              >
                <option
                  value=''
                  className='text-[16px] text-white-subheading_details cursor-pointer'
                >
                  All Months
                </option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                    className='text-[16px] text-white-subheading_details cursor-pointer'
                  >
                    {new Date(0, index).toLocaleString('default', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Feedbacks section */}
      <div className='w-full space-y-2 h-full flex items-center justify-center flex-col'>
        <>
          {loading ? (
            <>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-[300px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[330px] mb-6'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[360px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[500px] mb-2'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-[300px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[330px] mb-6'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[360px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[500px] mb-2'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-[300px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[330px] mb-6'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[360px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[500px] mb-2'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-[300px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[330px] mb-6'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[360px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[500px] mb-2'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-[300px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[330px] mb-6'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[360px] mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-[500px] mb-2'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
            </>
          ) : sortedFeedbacks.length === 0 ? (
            <p className='text-white-lightgray_desc'>No feedback available</p>
          ) : (
            sortedFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                id={feedback.id}
                name={feedback.name}
                email={feedback.email}
                feedback={feedback.feedback}
                createdat={
                  feedback.createdat
                    ? new Date(feedback.createdat).toLocaleDateString('en-PH', {
                        timeZone: 'Asia/Manila',
                      })
                    : 'Date not available'
                }
                // onDelete={(id) => {
                //   setDeleteId(id);
                //   setIsDialogOpen(true);
                // }}
              />
            ))
          )}
        </>

        {/* {isDialogOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30'>
            <div className='bg-white-panels rounded-lg p-5 shadow-md relative w-96'>
              <h2 className='text-lg font-semibold text-black'>
                Are you sure?
              </h2>
              <p className='text-sm mt-2 text-white-lightgray_desc'>
                This action cannot be undone.
              </p>
              <div className='flex justify-end mt-5'>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className='mr-2 text-black px-4 py-2 rounded text-base h-8 w-50 flex items-center'
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteId && handleDelete(deleteId)}
                  className='bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded text-base h-8 w-50 flex items-center'
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className='absolute top-5 right-5 text-white-lightgray_desc hover:text-gray-800 text-base'
              >
                ✖
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FeedbackList;
