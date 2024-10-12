'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Hook for handling route change
import FeedbackCard from './feedbackCard';

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const pathname = usePathname(); // Track the current path

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

  useEffect(() => {
    fetchFeedbacks(); // Fetch feedbacks when component mounts or pathname changes

    const intervalId = setInterval(fetchFeedbacks, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [pathname]); // Re-fetch feedbacks when the pathname changes (on navigation)

  return (
    <div className='w-full flex justify-center items-center text-white-panels text-xl flex-col gap-2'>
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            name={feedback.name}
            email={feedback.email}
            feedback={feedback.feedback}
          />
        ))
      )}
    </div>
  );
};

export default FeedbackList;
