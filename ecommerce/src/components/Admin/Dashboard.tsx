import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const kpiCards = [
    { label: 'Net Revenue', value: '$128,940', change: '+14.2% this month' },
    { label: 'Orders Completed', value: '1,284', change: '+8.7% this month' },
    { label: 'Active Customers', value: '3,942', change: '+12.1% this month' },
    { label: 'Avg. Order Value', value: '$82.60', change: '+4.5% this month' },
  ]

  const activities = [
    'Spring Essentials campaign reached 41k impressions in 24h.',
    'Inventory sync completed for 248 SKUs without conflicts.',
    'Customer support response time improved to 9 minutes.',
    'Payment success rate stabilized at 99.3% this week.',
  ]

  return (
    <main className="admin-page-shell">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Admin Control Center</p>
          <h1>Store performance at a glance</h1>
          <p>
            Review revenue, monitor operations, and take action quickly from one unified dashboard.
          </p>
        </div>
        <div className="admin-hero-actions">
          <Link to="/admin/products" className="btn-primary">
            Manage Products
          </Link>
          <Link to="/admin/customers" className="btn-secondary">
            View Customers
          </Link>
        </div>
      </section>

      <section className="admin-kpi-grid">
        {kpiCards.map((card) => (
          <article key={card.label} className="admin-kpi-card">
            <p>{card.label}</p>
            <strong>{card.value}</strong>
            <span>{card.change}</span>
          </article>
        ))}
      </section>

      <section className="admin-two-col">
        <article className="admin-panel-card">
          <h2>Operations Timeline</h2>
          <ul className="admin-list">
            {activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="admin-panel-card">
          <h2>Quick Actions</h2>
          <div className="admin-action-grid">
            <Link to="/admin/products">Add a new product listing</Link>
            <Link to="/admin/customers">Review recent customer signups</Link>
            <Link to="/survey">Open feedback analytics form</Link>
            <Link to="/">Return to storefront preview</Link>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Dashboard