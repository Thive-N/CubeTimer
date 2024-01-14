import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TimerPage from './pages/TimerPage/TimerPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimerPage />} />
      </Routes>
    </Router>
  );
}
