import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloPage from "./components/HelloPage";
import AdminPage from "./components/AdminPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HelloPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
  );
}

export default App;
