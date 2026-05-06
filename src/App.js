import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';
import RootLayout from './layout/RootLayout';

// Lazy load routes
const Login = lazy(() => import('./routes/Login'));
const Tasks = lazy(() => import('./routes/Tasks'));
const Board = lazy(() => import('./routes/Board'));
const Team = lazy(() => import('./routes/Team'));
const Profile = lazy(() => import('./routes/Profile'));
const Forbidden = lazy(() => import('./routes/Forbidden'));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes require login */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RootLayout />}>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/board" element={<Board />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin-only route */}
              <Route element={<RoleGuard role="admin" />}>
                <Route path="/team" element={<Team />} />
              </Route>
            </Route>
          </Route>

          {/* Forbidden page */}
          <Route path="/403" element={<Forbidden />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
