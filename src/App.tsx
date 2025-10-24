/** @jsxImportSource react */
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import MultispectralAnalysis from './pages/MultispectralAnalysis';
import CropDetection from './pages/CropDetection';
import MarketPrices from './pages/MarketPrices';
import Dashboard from './pages/dashboard';

// Import styles
import './App.css';

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Only show header on non-dashboard pages */}
      {!isDashboardPage && <Header />}

      <main style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '0 1rem', 
        paddingTop: isDashboardPage ? '0' : '1.5rem', 
        paddingBottom: '1.5rem' 
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/multispectral" element={<MultispectralAnalysis />} />
          <Route path="/detection" element={<CropDetection />} />
          <Route path="/market" element={<MarketPrices />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {/* Only show footer on non-dashboard pages */}
      {!isDashboardPage && <Footer />}
    </div>
  );
}

export default App;