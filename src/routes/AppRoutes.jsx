import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ErrorBoundary from '../components/ErrorBoundary';
import CreateJournal from '../pages/CreateJournal';
import EditJournal from '../pages/EditJournal';
import JournalList from '../pages/JournalList';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const HomepageGuard = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]"><LoadingSpinner /></div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Homepage />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Homepage — redirects to dashboard if logged in */}
      <Route path="/" element={<HomepageGuard />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with navbar layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
        <Route path="/journals" element={<JournalList />} />
        <Route path="/create" element={<CreateJournal />} />
        <Route path="/edit/:id" element={<EditJournal />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
