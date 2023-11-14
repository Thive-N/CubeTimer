/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import TimeDisplay from './TimeDisplay';

function Timer() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const timeHandler = useRef();
  // Not started = 0
  // started = 1
  // stopped = 2

  let updatedMs = time.ms;
  let updatedS = time.s;
  let updatedM = time.m;

  const run = () => {
    if (updatedS === 60) {
      updatedM += 1;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS += 1;
      updatedMs = 0;
    }
    updatedMs += 1;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM });
  };

  const start = () => {
    run();
    setInterval(run, 10);
  };

  const stop = () => {
    clearInterval(timeHandler.current);
  };

  const reset = () => {
    clearInterval(timeHandler.current);
    setTime({ ms: 0, s: 0, m: 0 });
  };

  return (
    <div>
      <TimeDisplay ms={time.ms} s={time.s} m={time.m} />
      <button onClick={start} type="button">
        Start
      </button>
    </div>
  );
}

export default Timer;
