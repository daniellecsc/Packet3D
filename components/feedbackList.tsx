'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FeedbackCard from './feedbackCard';

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
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
            id={feedback.id} // Pass id
            name={feedback.name}
            email={feedback.email}
            feedback={feedback.feedback}
            onDelete={handleDelete} // Pass the delete function
          />
        ))
      )}
    </div>
  );
};

export default FeedbackList;
