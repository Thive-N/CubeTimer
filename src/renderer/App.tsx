import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

function Placeholder() {
  return (
    <div>
      <h1>Placeholder</h1>
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
