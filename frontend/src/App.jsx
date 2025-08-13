import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from '@/hooks/use-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FileProvider } from '@/contexts/FileContext';
import { UserProvider } from '@/contexts/UserContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import Navigation from '@/components/layout/Navigation';
import Dashboard from '@/pages/Dashboard';
import FileManager from '@/pages/FileManager';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import LandingPage from '@/pages/LandingPage';
import LoadingScreen from '@/components/ui/LoadingScreen';

function AppLayout() {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <FileProvider>
          <NotificationProvider>
            <Router>
              <div className="min-h-screen bg-background transition-all duration-500">
                <Routes>
                  <Route path="/" element={<LandingPage />} />

                  <Route path="app" element={<AppLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="files" element={<FileManager />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="help" element={<Help />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </NotificationProvider>
        </FileProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
