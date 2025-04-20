
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { Dashboard } from './pages/Dashboard'
import DashboardHome from './pages/Dashboard/DashboardHome'
import PropertiesManagement from './pages/Dashboard/PropertiesManagment'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} >
        <Route index element={<DashboardHome />} />
        <Route path='properties' element={<PropertiesManagement />} />
        <Route path="users" element={<div>Users</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="profile" element={<div>Profile</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
