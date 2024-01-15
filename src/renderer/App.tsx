import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TimerPage from './pages/TimerPage/TimerPage';
import TimeGraph from './pages/TimeGraph/TimeGraph';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimerPage />} />
      </Routes>
      <Routes>
        <Route path="/timegraph" element={<TimeGraph />} />
      </Routes>
    </Router>
  );
}
