import React from 'react';
import './TimerPage.css';
import Timer from '../../components/Timer/Timer';
import ScoreCard from '../../components/ScoreCard/ScoreCard';

function TimerPage() {
  return (
    <div className="timer-page">
      <div className="score-sheet">
        <ScoreCard />
      </div>
      <div className="timer">
        <Timer />
      </div>
    </div>
  );
}

export default TimerPage;
