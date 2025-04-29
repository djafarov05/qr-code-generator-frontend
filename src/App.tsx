import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import MyQRCodes from './pages/MyQRCodes';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

import { useUserStore } from './store/userStore';
import { getProfile } from './api/api';

function App() {
  const login = useUserStore((s) => s.login);

  useEffect(() => {
    (async () => {
      try {
        const user = await getProfile();
        login(user);
      } catch {
        /* гость — игнорируем */
      }
    })();
  }, [login]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generator" element={<Generator />} />

            <Route
              path="/my-codes"
              element={
                <ProtectedRoute>
                  <MyQRCodes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      </div>
    </Router>
  );
}

export default App;
