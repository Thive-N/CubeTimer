import React, { useState, useRef, useEffect } from 'react';
import './Timer.css';

function Timer() {
  // react state hook to store the time
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  // react ref hook to store the interval id
  const intervalRef = useRef<any>();
  // react ref hook to store the state of the timer (running or not)
  const isRunningRef = useRef(false);
  const timeRef = useRef(time);

  const spaceHoldRunningRef = useRef<any>();
  const timerRunnable = useRef(false);
  const timerset = useRef(false);
  const [color, setColor] = useState('#483d8b');

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

  const timeToString = () => {
    return `${timeRef.current.m.toString()}:${timeRef.current.s.toString()}:${timeRef.current.ms.toString()}`;
  };

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        if (isRunningRef.current) {
          stop();
          window.electron.ipcRenderer.sendMessage('addTime', [timeToString()]);
          return;
        }
        if (!timerRunnable.current && !timerset.current) {
          setColor('#ff0000');
          spaceHoldRunningRef.current = setTimeout(() => {
            setColor('#00ff00');
            timerRunnable.current = true;
            timerset.current = true;
          }, 500);
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        setColor('#483d8b');
        clearTimeout(spaceHoldRunningRef.current);
        timerset.current = false;

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
      <div>
        <div className="widget">
          <span
            style={{
              backgroundColor: color,
            }}
            className="time"
          >
            {time.m >= 10 ? time.m : `0${time.m}`}
          </span>
          <span
            style={{
              backgroundColor: color,
            }}
            className="time"
          >
            {time.s >= 10 ? time.s : `0${time.s}`}
          </span>
          <span
            style={{
              backgroundColor: color,
            }}
            className="time"
          >
            {time.ms >= 10 ? time.ms : `0${time.ms}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Timer;
