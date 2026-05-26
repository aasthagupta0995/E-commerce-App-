import React from 'react'
import { Navigate } from 'react-router-dom'
import HomePage from './Home/Home'

const RoleHomeRedirect = () => {
  const adminSession = localStorage.getItem('ecom_admin_session')
  if (adminSession) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const userSession = localStorage.getItem('user_session')
  if (userSession) {
    return <Navigate to="/user/homepage" replace />
  }

  return <HomePage />
}

export default RoleHomeRedirect
