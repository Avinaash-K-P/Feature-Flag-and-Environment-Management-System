import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import DashboardLayout from './layouts/Dashboard'
import DashboardHome from './pages/analytics/Dashboard'
import Profile from './pages/profile/Profile'
import FeatureFlag from './pages/feature/FeatureFlag'
import Environments from './pages/feature/Environment'
import FlagEnvironment from './pages/feature/FlagEnvironment'
import Rollout from './pages/feature/Rollout'
import UserAssignments from './pages/feature/UserAssignment'
import AuditLog from './pages/audit/AuditLog'
import ManageUsers from './pages/users/ManageUsers'


function App() {
  return (
  <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Application Layout */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardHome />}
          />

            <Route
              path="/profile"
              element={<Profile />}
            />  

            <Route
              path="/manage-users"
              element={<ManageUsers/>}
            />  

            <Route
              path="/feature-flags"
              element={<FeatureFlag />}
            />  

            <Route
              path="/environments"
              element={<Environments/>}
            />  

            <Route
              path="/flag-environments"
              element={<FlagEnvironment/>}
            />  

            <Route
              path="/rollouts"
              element={<Rollout/>}
            />  

            <Route
              path="/assignments"
              element={<UserAssignments/>}
            />  

            <Route
              path="/audit-logs"
              element={<AuditLog/>}
            />  

        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App