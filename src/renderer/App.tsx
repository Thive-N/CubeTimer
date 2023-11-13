import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Timer from './components/Timer';

function Placeholder() {
  return (
    <div>
      <h1 className="text-xl bg-gray-500 text-center text-white">
        placeholder
      </h1>
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
