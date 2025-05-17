
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { Dashboard } from './pages/Dashboard'
import DashboardHome from './pages/Dashboard/DashboardHome'
import PropertiesManagement from './pages/Dashboard/PropertiesManagment'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage/LoginPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PropertyDetails from './components/PropertyDetails/PropertyDetails'

function App() {
 
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardHome />} />
          <Route path='properties' element={<PropertiesManagement />} />
          <Route path="users" element={<div>Users</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        <Route path="profile" element={<div>Profile</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
