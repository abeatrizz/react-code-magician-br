
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import EvidenceScreen from './screens/EvidenceScreen';
import EvidenceDetailScreen from './screens/EvidenceDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';
import BottomNavigation from './components/BottomNavigation';
import './App.css';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f5f0' }}>
        <div className="animate-pulse text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/cases" element={<CasosScreen />} />
        <Route path="/cases/:id" element={<CaseDetailScreen />} />
        <Route path="/new-case" element={<NewCaseScreen />} />
        <Route path="/evidence/:caseId" element={<EvidenceScreen />} />
        <Route path="/evidence/:caseId/:evidenceId" element={<EvidenceDetailScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/admin/users" element={<AdminUsersScreen />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      <BottomNavigation />
      <Toaster />
    </div>
  );
}

// Create QueryClient outside of component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
      refetchOnWindowFocus: false, // Evita refetch desnecessário
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
