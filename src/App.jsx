import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { RegistrationWorkflow } from './pages/RegistrationWorkflow';
import { FreelanceDashboard } from './pages/FreelanceDashboard';
import { EntrepriseDashboard } from './pages/EntrepriseDashboard';
import { ApporteurDashboard } from './pages/ApporteurDashboard';
import { GenericDashboard } from './pages/GenericDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotificationBell } from './components/ui/NotificationBell';
import { CheckCircle } from 'lucide-react';
import { supabase } from './lib/supabaseClient';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={`/dashboard-${user.role}`} replace />;
  return children;
};

// Extracted to use useNavigate hook
const AppContent = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session & sub to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) {
      setUser({ ...data, email: data.email });
      if(window.location.pathname === '/' || window.location.pathname === '/login') {
         navigate(`/dashboard-${data.role}`);
      }
    } else {
      // Fallback for mock users before DB is populated
      const savedMock = localStorage.getItem('bni_mock_user');
      if (savedMock) setUser(JSON.parse(savedMock));
    }
    setLoading(false);
  };

  const handleCompleteAuth = (role, isLogin, mockAuthData = null) => {
    if (mockAuthData) {
      setUser(mockAuthData);
      localStorage.setItem('bni_mock_user', JSON.stringify(mockAuthData));
    } else {
      setUser({ role });
    }

    if (isLogin) {
       navigate(`/dashboard-${role || mockAuthData?.role}`);
    } else {
       navigate('/onboarding');
    }
  };

  const handleCompleteOnboarding = (data) => {
    setUser(data);
    localStorage.setItem('bni_mock_user', JSON.stringify(data));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
    navigate(`/dashboard-${data.role}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('bni_mock_user');
    setUser(null);
    navigate('/');
  };

  if (loading) return <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-black uppercase text-2xl animate-pulse">Chargement Synapse...</div>;

  return (
    <>
      {showPopup && (
        <div className="fixed top-10 right-10 z-[999] animate-in slide-in-from-top-5 duration-500">
          <div className="bg-[#81C784] border-[4px] border-black rounded-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5 flex items-center gap-4">
            <CheckCircle size={28} strokeWidth={3} className="text-black" />
            <span className="font-black uppercase text-lg italic tracking-tighter">Votre compte a bien été configuré !</span>
          </div>
        </div>
      )}

      {user && <NotificationBell />}

      <Routes>
        <Route path="/" element={<LandingPage onStart={() => navigate('/login')} />} />
        <Route path="/login" element={<AuthPage onBack={() => navigate('/')} onCompleteAuth={handleCompleteAuth} />} />
        <Route path="/onboarding" element={
          user ? <RegistrationWorkflow selectedRole={user.role} onCancel={() => navigate('/login')} onComplete={handleCompleteOnboarding} /> : <Navigate to="/login" replace />
        } />
        
        <Route path="/dashboard-freelance" element={
          <ProtectedRoute user={user} allowedRoles={['freelance']}>
            <FreelanceDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard-entreprise" element={
          <ProtectedRoute user={user} allowedRoles={['entreprise']}>
            <EntrepriseDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard-apporteur" element={
          <ProtectedRoute user={user} allowedRoles={['apporteur']}>
            <ApporteurDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        <Route path="/dashboard-admin" element={
          <ProtectedRoute user={user} allowedRoles={['admin']}>
            <AdminDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to={user ? `/dashboard-${user.role}` : '/'} replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
