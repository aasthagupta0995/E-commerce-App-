import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import AdminPanel from './components/Admin/AdminPanel'
import RegisterPanel from './components/Admin/RegisterPanel'
import './App.css'

const featuredProducts = [
  {
    name: 'AeroFit Running Shoes',
    category: 'Footwear',
    price: '$89',
    rating: '4.8',
  },
  {
    name: 'Urban Daypack Pro',
    category: 'Bags',
    price: '$64',
    rating: '4.7',
  },
  {
    name: 'SmartSteel Water Bottle',
    category: 'Accessories',
    price: '$29',
    rating: '4.9',
  },
  {
    name: 'CloudSoft Hoodie',
    category: 'Apparel',
    price: '$54',
    rating: '4.6',
  },
]

const HomePage = () => {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand-block">
          <span className="brand-badge">NovaCart</span>
          <p className="brand-tagline">Modern commerce for modern brands</p>
        </div>
        <nav className="site-nav">
          <a href="#features">Features</a>
          <a href="#products">Products</a>
          <a href="#faq">FAQ</a>
          <Link to="/admin/login" className="nav-cta">
            Admin Login
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div>
            <p className="eyebrow">Next Gen E-Commerce Starter</p>
            <h1>Launch a premium shopping experience without the chaos.</h1>
            <p className="hero-copy">
              Built to scale, fast to customize, and easy to manage. Start with a clean frontend and expand
              into full cart, checkout, payments, and analytics.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn-primary">
                Explore Products
              </a>
              <Link to="/register" className="btn-secondary">
                Create Admin Account
              </Link>
            </div>
          </div>
          <div className="hero-highlight">
            <h2>Store Pulse</h2>
            <ul>
              <li>
                <span>Conversion Lift</span>
                <strong>+22%</strong>
              </li>
              <li>
                <span>Avg. Delivery</span>
                <strong>1.8 days</strong>
              </li>
              <li>
                <span>Returning Customers</span>
                <strong>63%</strong>
              </li>
            </ul>
          </div>
        </section>

        <section id="features" className="feature-grid">
          <article>
            <h3>Fast UI Foundation</h3>
            <p>Performance-focused components to keep interactions smooth across desktop and mobile.</p>
          </article>
          <article>
            <h3>Admin Ready</h3>
            <p>Secure login and registration flow ready for API integration and role-based access.</p>
          </article>
          <article>
            <h3>Scalable Structure</h3>
            <p>Simple folder setup today, easy to split into pages, services, and state modules tomorrow.</p>
          </article>
        </section>

        <section id="products" className="products-panel">
          <div className="section-header">
            <p className="eyebrow">Featured Collection</p>
            <h2>Top picks your customers will love</h2>
          </div>
          <div className="products-grid">
            {featuredProducts.map((item) => (
              <article key={item.name} className="product-card">
                <span className="product-category">{item.category}</span>
                <h3>{item.name}</h3>
                <p className="product-meta">Rating {item.rating}</p>
                <div className="product-footer">
                  <strong>{item.price}</strong>
                  <button type="button">Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="faq-panel">
          <div>
            <h2>What is ready now?</h2>
            <p>
              You now have a production-style landing page, responsive layout, and working admin auth screens
              with local storage based user records.
            </p>
          </div>
          <div>
            <h2>What is next?</h2>
            <p>Add product APIs, cart state management, checkout flow, and backend authentication tokens.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/register" element={<RegisterPanel />} />
        <Route path="/admin/login" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App