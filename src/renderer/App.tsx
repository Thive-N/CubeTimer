import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Timer from './components/Timer/Timer';

function Placeholder() {
  return (
    <div className="Timer">
      <Timer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Placeholder />} />
      </Routes>
    </Router>
  );
}
