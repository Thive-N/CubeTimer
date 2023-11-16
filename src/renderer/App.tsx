import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Timer from './components/Timer/Timer';

function Root() {
  return (
    <div className="main-page">
      <div className="score-sheet">
        <h1>scores</h1>
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
