import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Timer from './components/Timer/Timer';
import ScoreCard from './components/ScoreCard/ScoreCard';

function Root() {
  return (
    <div className="main-page">
      <div className="score-sheet">
        <ScoreCard />
      </div>
      <div className="timer">
        <Timer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
}
