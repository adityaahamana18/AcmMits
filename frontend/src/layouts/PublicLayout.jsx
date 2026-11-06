import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-600 selection:text-white position-relative">
      <Navbar />
      <main className="flex-grow position-relative z-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
