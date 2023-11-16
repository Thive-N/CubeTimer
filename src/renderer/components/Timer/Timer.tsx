import React, { useState, useRef, useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import './Timer.css';

function Timer() {
  // react state hook to store the time
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  // react ref hook to store the interval id
  const intervalRef = useRef<any>();
  // react ref hook to store the state of the timer (running or not)
  const isRunningRef = useRef(false);

  const spaceHoldRunningRef = useRef<any>();
  const timerRunnable = useRef(false);

  // function to increment the time
  const run = () => {
    setTime((prevTime) => {
      let updatedMs = prevTime.ms;
      let updatedS = prevTime.s;
      let updatedM = prevTime.m;

      updatedMs += 1;

      if (updatedS === 60) {
        updatedM += 1;
        updatedS = 0;
      }
      if (updatedMs === 100) {
        updatedS += 1;
        updatedMs = 0;
      }

      return { ms: updatedMs, s: updatedS, m: updatedM };
    });
  };

  const start = () => {
    isRunningRef.current = true;
    intervalRef.current = setInterval(run, 10);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    isRunningRef.current = false;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    isRunningRef.current = true;
    setTime({ ms: 0, s: 0, m: 0 });
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        if (isRunningRef.current) {
          stop();
          return;
        }
        if (!timerRunnable.current) {
          spaceHoldRunningRef.current = setTimeout(() => {
            timerRunnable.current = true;
          }, 500);
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        clearTimeout(spaceHoldRunningRef.current);
        if (timerRunnable.current) {
          if (!isRunningRef.current) {
            reset();
            start();
          }
        }
        timerRunnable.current = false;
      }
    });
    // TODO: fix exhaustive deps warning.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <TimeDisplay ms={time.ms} s={time.s} m={time.m} />
    </div>
  );
}

export default Timer;
