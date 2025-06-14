
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import CasosScreen from './screens/CasosScreen';
import CaseDetailScreen from './screens/CaseDetailScreen';
import NewCaseScreen from './screens/NewCaseScreen';
import VitimasScreen from './screens/VitimasScreen';
import EvidenceScreen from './screens/EvidenceScreen';
import EvidenceDetailScreen from './screens/EvidenceDetailScreen';
import LaudosScreen from './screens/LaudosScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';
import ReportsScreen from './screens/ReportsScreen';
import BottomNavigation from './components/BottomNavigation';
import './App.css';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  console.log('App rendering - isAuthenticated:', isAuthenticated, 'loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f5f0' }}>
        <div className="animate-pulse text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, showing login routes');
    return (
      <>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </>
    );
  }

  console.log('User authenticated, showing app routes');
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/cases" element={<CasosScreen />} />
        <Route path="/cases/:id" element={<CaseDetailScreen />} />
        <Route path="/new-case" element={<NewCaseScreen />} />
        <Route path="/cases/:caseId/vitimas" element={<VitimasScreen />} />
        <Route path="/evidence/:caseId" element={<EvidenceScreen />} />
        <Route path="/evidence/:caseId/:evidenceId" element={<EvidenceDetailScreen />} />
        <Route path="/laudos" element={<LaudosScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/admin/users" element={<AdminUsersScreen />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <BottomNavigation />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
