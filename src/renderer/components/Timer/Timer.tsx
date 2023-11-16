import React, { useState, useRef, useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import './Timer.css';

function Timer() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const intervalRef = useRef<any>();
  const isRunningRef = useRef(false);

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
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        if (isRunningRef.current) {
          stop();
        } else {
          reset();
          start();
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <TimeDisplay ms={time.ms} s={time.s} m={time.m} />
    </div>
  );
}

export default Timer;
