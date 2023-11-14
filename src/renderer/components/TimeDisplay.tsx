import React from 'react';

function TimeDisplay({ m, s, ms }: { m: number; s: number; ms: number }) {
  return (
    <div>
      <div>
        <span>{m >= 10 ? m : `0${m}`}</span>
        <span>{s >= 10 ? s : `0${s}`}</span>
        <span>{ms >= 10 ? ms : `0${ms}`}</span>
      </div>
    </div>
  );
}

export default TimeDisplay;
