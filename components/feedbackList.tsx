'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FeedbackCard from './feedbackCard'; // Ensure the path is correct

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null); // Track which ID to delete
  const pathname = usePathname();

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/submit');
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  // Delete feedback function
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/submit?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting feedback:', errorData);
        throw new Error('Failed to delete feedback');
      }

      // Remove the deleted feedback from the state
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== id)
      );
      setIsDialogOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    const intervalId = setInterval(fetchFeedbacks, 5000);

    return () => clearInterval(intervalId);
  }, [pathname]);

  return (
    <div className='w-full flex justify-center items-center text-white-panels text-xl flex-col gap-2'>
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            id={feedback.id}
            name={feedback.name}
            email={feedback.email}
            feedback={feedback.feedback}
            createdat={new Date(feedback.createdat).toLocaleString('en-PH', {
              timeZone: 'Asia/Manila',
              hour12: true,
            })}
            onDelete={(id) => {
              setDeleteId(id); // Set the ID of the feedback to be deleted
              setIsDialogOpen(true); // Open the dialog
            }}
          />
        ))
      )}

      {/* Confirmation Pop-up Dialog */}
      {isDialogOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30'>
          <div className='bg-white-panels rounded-lg p-5 shadow-md relative w-96'>
            <h2 className='text-lg font-semibold text-black'>Are you sure?</h2>
            <p className='text-sm mt-2 text-white-lightgray_desc'>
              This action cannot be undone.
            </p>
            <div className='flex justify-end mt-5'>
              <button
                onClick={() => setIsDialogOpen(false)} // Close the dialog
                className='mr-2 text-black px-4 py-2 rounded text-base h-8 w-50 flex items-center'
              >
                Cancel
              </button>
              <button
                onClick={() => deleteId && handleDelete(deleteId)} // Confirm deletion
                className='bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded text-base h-8 w-50 flex items-center'
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => setIsDialogOpen(false)} // Close the dialog
              className='absolute top-5 right-5 text-white-lightgray_desc hover:text-gray-800 text-base'
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
