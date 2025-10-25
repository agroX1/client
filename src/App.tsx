/** @jsxImportSource react */
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import Dashboard from './pages/dashboard';
import CustomerSegmentation from './pages/CustomerSegmentation';
import CustomerRetention from './pages/CustomerRetention';
import ProductRecommendations from './pages/ProductRecommendations';

import { SignUp, SignIn } from './components/account';

// Import styles
import './App.css';

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      <main style={{ 
        maxWidth: isAuthPage ? '100%' : '80rem', 
        margin: '0 auto', 
        padding: '0 1rem', 
        paddingTop: isDashboardPage || isAuthPage ? '0' : '1.5rem', 
        paddingBottom: isAuthPage ? '0' : '1.5rem' 
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/segmentation" element={<CustomerSegmentation />} />
          <Route path="/dashboard/retention" element={<CustomerRetention />} />
          <Route path="/dashboard/recommendations" element={<ProductRecommendations />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {/* Only show footer on non-dashboard and non-auth pages */}
      {!isDashboardPage && !isAuthPage && <Footer />}
    </div>
  );
}

export default App;