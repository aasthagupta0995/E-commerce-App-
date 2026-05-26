import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const hasUserSession = () => {
  const raw = localStorage.getItem('user_session')
  if (!raw) {
    return false
  }

  try {
    const parsed = JSON.parse(raw) as { email?: string; role?: string }
    if (!parsed.email) {
      return false
    }

    if (parsed.role && parsed.role !== 'user') {
      return false
    }

    return true
  } catch {
    return false
  }
}

const UserAuthGuard = () => {
  return hasUserSession() ? <Outlet /> : <Navigate to="/user/login" replace />
}

export default UserAuthGuard
