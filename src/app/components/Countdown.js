// src/app/components/Countdown.js
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Initialize the time as 0 initially
  const [celebrating, setCelebrating] = useState(false); // To track celebration
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // For responsive confetti width
  const [windowHeight, setWindowHeight] = useState(window.innerHeight); // For responsive confetti height

  useEffect(() => {
    const targetDate = new Date('2025-03-31T00:00:00'); // Set your specific Eid date and time
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCelebrating(true); // Celebrate once the countdown ends
        clearInterval(interval); // Stop the countdown once the celebration starts
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    // Adjust the window size for confetti effect
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    });

    return () => clearInterval(interval);
  }, []);

  // Format time left into days, hours, minutes, and seconds
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)); // Calculate days
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24); // Calculate hours
    const minutes = Math.floor((time / (1000 * 60)) % 60); // Calculate minutes
    const seconds = Math.floor((time / 1000) % 60); // Calculate seconds

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div className="text-center h-20">
      {/* Confetti Celebration when time is up */}
      {celebrating && (
        <>
          <Confetti width={windowWidth} height={windowHeight} numberOfPieces={500} />
          <h1 className="text-4xl font-bold text-green-500 mt-10">Eid Mubarak! The time has arrived!</h1>
        </>
      )}

      {/* Show countdown if not yet time for celebration */}
      {!celebrating && (
        <div className="text-[30px] font-semibold text-indigo-800 mt-4">
          Time left until Eid: {formatTime(timeLeft)}
        </div>
      )}
    </div>
  );
};

export default Countdown;
