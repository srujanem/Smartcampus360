import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import EventsPage from './pages/EventsPage';
import EmergencyPage from './pages/EmergencyPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <footer className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="font-bold text-slate-900">Smart Campus 360</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Smart Campus 360. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
