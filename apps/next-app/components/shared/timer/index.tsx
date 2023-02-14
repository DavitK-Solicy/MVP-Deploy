import React, { useState, useEffect } from 'react';
import { TimerProps } from './types';

const Timer = ({ setCheckTime, checkTime }: TimerProps): JSX.Element => {
  const [minutes, setMinutes] = useState<number>(15);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (checkTime) {
        clearInterval(intervalId);
        return;
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          setCheckTime(true);
          return;
        }
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  return (
    <span>
      {minutes}:{('0' + seconds).slice(-2)}
    </span>
  );
};

export default Timer;
