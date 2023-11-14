import React, { useState, useRef } from 'react';
import TimeDisplay from './TimeDisplay';

function Timer() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const intervalRef = useRef<any>();
  const isRunningRef = useRef(false);

  const run = () => {
    setTime((prevTime) => {
      let updatedMs = prevTime.ms;
      let updatedS = prevTime.s;
      let updatedM = prevTime.m;

      if (updatedS === 60) {
        updatedM += 1;
        updatedS = 0;
      }
      if (updatedMs === 100) {
        updatedS += 1;
        updatedMs = 0;
      }
      updatedMs += 1;

      return { ms: updatedMs, s: updatedS, m: updatedM };
    });
  };

  const start = () => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      intervalRef.current = setInterval(run, 10);
    }
  };

  const stop = () => {
    if (isRunningRef.current) {
      clearInterval(intervalRef.current);
      isRunningRef.current = false;
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    isRunningRef.current = false;
    setTime({ ms: 0, s: 0, m: 0 });
  };

  return (
    <div>
      <TimeDisplay ms={time.ms} s={time.s} m={time.m} />
      <button onClick={start} type="button">
        Start
      </button>
      <button onClick={stop} type="button">
        Stop
      </button>
      <button onClick={reset} type="button">
        Reset
      </button>
    </div>
  );
}

export default Timer;
