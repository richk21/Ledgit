import React, { useState, useEffect } from 'react';

const WindowWidthTracker = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once after component mount

  console.log("window width is:", windowWidth);

  return { windowWidth }; // Return windowWidth as an object
};

export default WindowWidthTracker;
