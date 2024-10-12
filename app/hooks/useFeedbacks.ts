// hooks/useFeedbacks.ts
import { useEffect, useState } from 'react';
import { sql } from '@vercel/postgres';

const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    try {
      const res = await sql`SELECT * FROM feedbacks LIMIT 1000000`;
      setFeedbacks(res.rows);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Error fetching feedbacks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Initial fetch

    const interval = setInterval(() => {
      fetchFeedbacks(); // Poll every 5 seconds (5000 ms)
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return { feedbacks, loading, error };
};

export default useFeedbacks;
