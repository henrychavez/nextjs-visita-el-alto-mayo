import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calendar, Users, Map, Menu } from 'lucide-react';
import Navbar from './components/Navbar';
import ExperienceList from './components/ExperienceList';
import ExperienceDetails from './components/ExperienceDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ExperienceList />} />
            <Route path="/experience/:id" element={<ExperienceDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;