import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from "./components/AdminPage";
import UserDetailPage from "./components/UserDetailPage";
import SupportPage from "./components/SupportPage";
import ReportDetailPage from "./components/ReportDetailPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />} />
            <Route path="/user-detail" element={<UserDetailPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/:reportId" element={<ReportDetailPage />} />
        </Routes>
      </Router>
  );
}

export default App;
