"use client"
import React, { useEffect, useState } from 'react';
import styles from './Countdown.module.css'; 

const Countdown = ({ targetDate, label }) => {
  const calculateTimeLeft = () => {
    const target = new Date(targetDate);
    const difference = target - new Date() + target.getTimezoneOffset()*60;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const f = (num) => String(num).padStart(2, '0');

  return (
    <div className = {styles.wrap}>
        <div className={styles.label}>Time until <b>{label}</b></div>
        <div className={styles.countdown}>{`${f(timeLeft.days)}:${f(timeLeft.hours)}:${f(timeLeft.minutes)}:${f(timeLeft.seconds)}`}</div>
        <div className={styles.label}>{new Date(targetDate).toString()}</div>
    </div>
  );
};

export default Countdown;