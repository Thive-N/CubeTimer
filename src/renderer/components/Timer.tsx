import React, { useRef, useState } from 'react';

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
      {' '}
      <div>
        <span>{time.m >= 10 ? time.m : `0${time.m}`}</span>
        <span>{time.s >= 10 ? time.s : `0${time.s}`}</span>
        <span>{time.ms >= 10 ? time.ms : `0${time.ms}`}</span>
      </div>
      <button onClick={start} type="button">
        Start
      </button>
    </div>
  );
}

export default Timer;
