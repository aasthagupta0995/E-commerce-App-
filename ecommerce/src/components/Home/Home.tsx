import React from 'react'
import { Link } from 'react-router-dom'
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
          <p className="brand-tagline">Commerce platform for ambitious digital brands</p>
        </div>
        <nav className="site-nav">
          <a href="#features">Features</a>
          <a href="#products">Products</a>
          <a href="#faq">FAQ</a>
          <Link to="/admin/login" className="nav-cta">
            Admin Login
          </Link>
          <Link to="/register" className="btn-secondary">
            Logout
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div>
            <p className="eyebrow">Next Gen E-Commerce Starter</p>
            <h1>Build a polished storefront your customers trust from day one.</h1>
            <p className="hero-copy">
              Ship faster with a clean architecture, admin tooling, and responsive shopping flow.
              Ready for product APIs, checkout, payments, and analytics as your store scales.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn-primary">
                Browse Collection
              </a>
              <Link to="/register" className="btn-secondary">
                Create Admin Account
              </Link>
            </div>
          </div>
          <div className="hero-highlight">
            <h2>Business Snapshot</h2>
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
            <h3>Performance First</h3>
            <p>Optimized interface patterns keep browsing and interactions smooth on every device.</p>
          </article>
          <article>
            <h3>Operations Ready</h3>
            <p>Structured admin workflows make it easier to manage products, users, and content changes.</p>
          </article>
          <article>
            <h3>Scalable Foundation</h3>
            <p>Modular project setup supports future expansion into services, APIs, and advanced analytics.</p>
          </article>
        </section>

        <section id="products" className="products-panel">
          <div className="section-header">
            <p className="eyebrow">Featured Collection</p>
            <h2>Best sellers your audience will love</h2>
          </div>
          <div className="products-grid">
            {featuredProducts.map((item) => (
              <article key={item.name} className="product-card">
                <span className="product-category">{item.category}</span>
                <h3>{item.name}</h3>
                <p className="product-meta">Rating {item.rating}</p>
                <div className="product-footer">
                  <strong>{item.price}</strong>
                  <button type="button">Quick Add</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="faq-panel">
          <div>
            <h2>What is included today?</h2>
            <p>
              Production-ready homepage, responsive layout, user journeys, and admin authentication flows
              with local storage session support.
            </p>
          </div>
          <div>
            <h2>Recommended next step</h2>
            <p>Integrate backend APIs for products, checkout, payment processing, and token-based security.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
export default HomePage