// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './app/layouts/MainLayout';

// Pages (Lazy loaded for production performance)
const HomePage = lazy(() => import('./app/pages/HomePage'));
const AuthPage = lazy(() => import('./app/pages/AuthPage'));
const JournalPage = lazy(() => import('./app/pages/JournalPage'));
const ChatPage = lazy(() => import('./app/pages/ChatPage'));
const ProfilePage = lazy(() => import('./app/pages/ProfilePage'));
const NotFound = lazy(() => import('./app/pages/NotFoundPage'));

/**
 * A simple Protected Route wrapper.
 * In a real app, check your JWT or Auth Context here.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Replace this with your actual auth logic (e.g., const { user } = useAuth())
  const isAuthenticated = true; 
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <MainLayout>{children}</MainLayout>;
};

/**
 * Loading Spinner for Suspense fallback
 */
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-amaithi-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-amaithi-muted font-medium animate-pulse">Setting the space...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Landing Page (Wrapped in Layout but public) */}
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />

          {/* Protected Application Routes */}
          <Route path="/journal" element={
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          } />

          <Route path="/chat" element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* 404 Catch-all */}
          <Route path="*" element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;