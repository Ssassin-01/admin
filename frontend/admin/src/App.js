import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from "./components/AdminPage";
import UserDetailPage from "./components/UserDetailPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />} />
            <Route path="/user-detail" element={<UserDetailPage />} />
        </Routes>
      </Router>
  );
}

export default App;
