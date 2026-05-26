import React from 'react'
import AdminPanel from './AdminPanel'
import { Navigate, Outlet } from 'react-router-dom'
// HOC
const AuthGuard = () => {
    // const isAuthenticated = !!localStorage.getItem('ecom_admin_session')
    const isAuthenticated = ()=>{
        const session = localStorage.getItem('ecom_admin_session')
        if(!session) return false
        return true
    }
    
  return (
    <div>
      {isAuthenticated() ? (
        <div>
        <Outlet/>
        </div>
        ) : (
     <Navigate to="/admin/login" replace />
      )}
    </div>


  )
}

export default AuthGuard