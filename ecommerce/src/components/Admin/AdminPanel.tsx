import React from 'react'
import LoginForm from './LoginForm'

const AdminPanel: React.FC = () => {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <LoginForm />
      </div>
    </section>
  )
}

export default AdminPanel