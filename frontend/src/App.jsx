import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';

// Lazy load all page and core components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Community = lazy(() => import('./components/Community'));
const Library = lazy(() => import('./components/Library'));
const Contact = lazy(() => import('./pages/Contact'));
const Profile = lazy(() => import('./components/Profile'));
const SignIn = lazy(() => import('./components/SignIn'));
const SignUp = lazy(() => import('./components/SignUp'));
const Legacy = lazy(() => import('./components/Legacy'));
const GovernmentSchemes = lazy(() => import('./components/GovernmentSchemes'));
const Contribute = lazy(() => import('./components/Contribute'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading spinner fallback during lazy chunk downloads
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Setu…</p>
      </div>
    </div>
  );
}

// Scroll to top helper component on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Route Guard component for protected routes
function ProtectedRoute({ children }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/legacy" element={<Legacy />} />
            <Route path="/schemes" element={<GovernmentSchemes />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contribute"
              element={
                <ProtectedRoute>
                  <Contribute />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
