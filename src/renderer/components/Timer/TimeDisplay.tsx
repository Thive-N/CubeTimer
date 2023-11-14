import React from 'react';
import './TimerDisplay.css';

function TimeDisplay({ m, s, ms }: { m: number; s: number; ms: number }) {
  return (
    <div>
      <div className="Widget">
        <span className="Time">{m >= 10 ? m : `0${m}`}</span>
        <span className="Time">{s >= 10 ? s : `0${s}`}</span>
        <span className="Time">{ms >= 10 ? ms : `0${ms}`}</span>
      </div>
    </div>
  );
}

export default TimeDisplay;
