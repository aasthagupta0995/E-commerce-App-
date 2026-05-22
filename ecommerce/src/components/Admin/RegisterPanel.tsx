import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type AdminUser = {
  name: string
  email: string
  password: string
}

const RegisterPanel: React.FC = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [message, setMessage] = React.useState('')
  const navigate = useNavigate()

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const users = JSON.parse(localStorage.getItem('ecom_admin_users') ?? '[]') as AdminUser[]
    const exists = users.some((user) => user.email === email)

    if (exists) {
      setError('An account with this email already exists.')
      return
    }

    const newUsers = [...users, { name, email, password }]
    localStorage.setItem('ecom_admin_users', JSON.stringify(newUsers))
    setMessage('Account created successfully. Redirecting to login...')

    window.setTimeout(() => {
      navigate('/admin/login')
    }, 900)
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create Admin Account</h1>
        <p className="form-helper">Create your account to access the admin panel.</p>

        <form onSubmit={handleRegister}>
          <label htmlFor="name">
            Full Name
            <input
              id="name"
              type="text"
              placeholder="John Carter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}

          <button type="submit">Create Account</button>
        </form>

        <div className="auth-links">
          <span className="form-helper">Already have an account?</span>
          <Link to="/admin/login">Back to Login</Link>
        </div>
      </div>
    </section>
  )
}

export default RegisterPanel