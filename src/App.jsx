import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { ConfirmModal } from './components/common/ConfirmModal';
import { HotelListPage } from './pages/HotelListPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { AddHotelPage } from './pages/AddHotelPage';
import { EditHotelPage } from './pages/EditHotelPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body with Routes */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HotelListPage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
          <Route path="/add-hotel" element={<AddHotelPage />} />
          <Route path="/edit-hotel/:id" element={<EditHotelPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Global Interactive Elements */}
      <Toast />
      <ConfirmModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

