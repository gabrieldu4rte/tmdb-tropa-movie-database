import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage   from './pages/SearchPage'
import WatchedPage  from './pages/WatchedPage'
import RatingsPage  from './pages/RatingsPage'
import TermsPage from './pages/TermsPage'

function PrivateOutlet() {
  const { user } = useAuth()
  return user ? <Outlet/> : <Navigate to="/login" replace/>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/terms"    element={<TermsPage />} />

      {/* Private Routes */}

      <Route element={<PrivateOutlet />}>
        <Route path="/search"           element={<SearchPage />} />
        <Route path="/watched"          element={<WatchedPage />} />
        <Route path="/:id/ratings" element={<RatingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/search" replace/>} />
    </Routes>
  )
}
