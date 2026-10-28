import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import LearningHub from './pages/LearningHub';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import JoinUs from './pages/JoinUs';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route path="/admin" element={token ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
      <Route path="/admin/dashboard" element={token ? <AdminDashboard /> : <Navigate to="/admin" />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

