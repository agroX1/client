/** @jsxImportSource react */
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import MultispectralAnalysis from './pages/MultispectralAnalysis';
import Dashboard from './pages/dashboard';
import { SignIn, SignUp } from './components/account';

// Import styles
import './App.css';

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard';
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Only show header on non-dashboard and non-auth pages */}
      {!isDashboardPage && !isAuthPage && <Header />}

      <main style={{ 
        maxWidth: isAuthPage ? '100%' : '80rem', 
        margin: '0 auto', 
        padding: '0 1rem', 
        paddingTop: isDashboardPage || isAuthPage ? '0' : '1.5rem', 
        paddingBottom: isAuthPage ? '0' : '1.5rem' 
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/multispectral" element={<MultispectralAnalysis />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </main>

      {/* Only show footer on non-dashboard and non-auth pages */}
      {!isDashboardPage && !isAuthPage && <Footer />}
    </div>
  );
}

export default App;