'use client';

import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Check if the user has scrolled to near the bottom of the page
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // Show button when user is near the bottom of the page (e.g., within 100px)
    if (scrollPosition >= pageHeight - 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener when the component is mounted
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    };
  }, []);

  // Only show the button when isVisible is true
  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={handleScrollToTop}
      className='fixed bottom-10 right-10 bg-white-panels text-white p-5 w-16 h-16 flex justify-center items-center rounded-full shadow-lg hover:bg-white-inactive_titles_desc transition duration-300 z-50'
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
