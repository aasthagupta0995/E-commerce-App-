import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../Slice/UserSlice'
import {  verifyUser } from '../Admin/authStorage'

const UserLogin: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setMessage('')

    const foundUser = await verifyUser(email, password)

    if (!foundUser) {
      setError('Invalid email or password. Please try again.')
      return
    }

    const token = btoa(`${foundUser.email}:${Date.now()}`)

    localStorage.setItem(
      'user_session',
      JSON.stringify({ email: foundUser.email, name: foundUser.name, role: 'user', token }),
    )
    dispatch(login({ name: foundUser.name, email: foundUser.email }))
    setMessage('Login successful. Redirecting to your shopping page...')

    window.setTimeout(() => {
      navigate('/user/homepage')
    }, 700)
  }

  const handleForgotPassword = () => {
    setMessage('Password reset flow is the next function to implement (backend API required).')
    setError('')
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>User Login</h1>
        <p className="form-helper">Use your registered account to access your account.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}

          <button type="submit">Login</button>
        </form>

        <div className="auth-links">
          <button type="button" onClick={handleForgotPassword}>
            Forgot Password
          </button>
          <Link to="/user/signUp">Create Account</Link>
        </div>
      </div>
    </section>
  )
}

export default UserLogin