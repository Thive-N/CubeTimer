import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TimerPage from './pages/TimerPage/TimerPage';
import TimeGraph from './pages/TimeGraph/TimeGraph';
import SideBar from './components/SideBar/SideBar';

export default function App() {
  return (
    <Router>
      <div className="RouterContainer">
        <SideBar />
        <div className="RouteContainer">
          <Routes>
            <Route path="/" element={<TimerPage />} />
          </Routes>
          <Routes>
            <Route path="/timegraph" element={<TimeGraph />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
