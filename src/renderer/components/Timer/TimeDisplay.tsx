import React from 'react';
import './TimerDisplay.css';

function TimeDisplay({ m, s, ms }: { m: number; s: number; ms: number }) {
  return (
    <div>
      <div className="widget">
        <span className="time">{m >= 10 ? m : `0${m}`}</span>
        <span className="time">{s >= 10 ? s : `0${s}`}</span>
        <span className="time">{ms >= 10 ? ms : `0${ms}`}</span>
      </div>
    </div>
  );
}

export default TimeDisplay;
