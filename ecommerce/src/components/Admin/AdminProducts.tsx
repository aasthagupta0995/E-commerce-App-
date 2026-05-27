import React from 'react'

type ProductStatus = 'Active' | 'Low Stock' | 'Out of Stock'

type Product = {
  id: number
  name: string
  price: string
  category: string
  stock: number
  status: ProductStatus
  revenue: string
  trend: string
  fulfillment: string
}

const AdminProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'AeroFit Running Shoes',
      price: '$89.00',
      category: 'Footwear',
      stock: 126,
      status: 'Active',
      revenue: '$14.8k',
      trend: '+12%',
      fulfillment: 'Ready to ship',
    },
    {
      id: 2,
      name: 'Urban Daypack Pro',
      price: '$64.00',
      category: 'Bags',
      stock: 84,
      status: 'Active',
      revenue: '$9.2k',
      trend: '+8%',
      fulfillment: 'Healthy inventory',
    },
    {
      id: 3,
      name: 'CloudSoft Hoodie',
      price: '$54.00',
      category: 'Apparel',
      stock: 42,
      status: 'Low Stock',
      revenue: '$6.1k',
      trend: '+4%',
      fulfillment: 'Restock in 3 days',
    },
    {
      id: 4,
      name: 'SmartSteel Bottle',
      price: '$29.00',
      category: 'Accessories',
      stock: 0,
      status: 'Out of Stock',
      revenue: '$3.4k',
      trend: '-6%',
      fulfillment: 'Supplier delayed',
    },
  ]

  const highlights = [
    { label: 'Catalog Health', value: '94%', detail: 'Pricing, imagery, and metadata complete across top sellers.' },
    { label: 'Merchandising Focus', value: '12', detail: 'Products flagged for promotion refresh before the weekend campaign.' },
    { label: 'Pending Reorders', value: '7', detail: 'Vendor follow-up needed for items projected to run out this week.' },
  ]

  const segments = [
    { title: 'Top Category', value: 'Footwear', detail: '32% of weekly revenue' },
    { title: 'Fastest Growth', value: 'Travel Bags', detail: '+18% conversion rate' },
    { title: 'Margin Watch', value: 'Accessories', detail: 'Review discount depth' },
  ]

  const statusClassName = (status: ProductStatus) => {
    if (status === 'Active') {
      return 'status-pill ok'
    }

    if (status === 'Out of Stock') {
      return 'status-pill danger'
    }

    return 'status-pill warn'
  }

  return (
    <main className="admin-page-shell admin-products-page">
      <section className="admin-hero admin-products-hero">
        <div>
          <p className="eyebrow">Catalog Management</p>
          <h1>Professional product operations dashboard</h1>
          <p>
            Oversee merchandising performance, isolate stock risk, and move from insight to action without leaving the catalog view.
          </p>
        </div>
        <div className="admin-hero-actions">
          <button className="btn-primary" type="button">Add Product</button>
          <button className="btn-secondary" type="button">Export Catalog</button>
        </div>
      </section>

      <section className="admin-kpi-grid">
        <article className="admin-kpi-card accent-teal">
          <p>Total SKUs</p>
          <strong>248</strong>
          <span>Across 18 categories</span>
        </article>
        <article className="admin-kpi-card accent-amber">
          <p>Low Stock Alerts</p>
          <strong>12</strong>
          <span>5 require action today</span>
        </article>
        <article className="admin-kpi-card accent-red">
          <p>Out of Stock</p>
          <strong>4</strong>
          <span>Projected $2.1k revenue at risk</span>
        </article>
        <article className="admin-kpi-card accent-slate">
          <p>Weekly Revenue</p>
          <strong>$33.5k</strong>
          <span>+11.4% vs last week</span>
        </article>
      </section>

      <section className="admin-products-top-grid">
        <article className="admin-panel-card admin-panel-card-dark">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">Executive Snapshot</p>
              <h2>Catalog priorities</h2>
            </div>
            <span className="panel-chip">Live</span>
          </div>
          <div className="admin-highlight-grid">
            {highlights.map((item) => (
              <article key={item.label} className="admin-highlight-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="admin-panel-card">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">Merchandising Signals</p>
              <h2>Where to focus next</h2>
            </div>
          </div>
          <div className="admin-segment-list">
            {segments.map((segment) => (
              <div key={segment.title} className="admin-segment-item">
                <span>{segment.title}</span>
                <strong>{segment.value}</strong>
                <p>{segment.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-table-wrap admin-products-table-wrap">
        <div className="admin-table-toolbar">
          <div>
            <p className="eyebrow">Inventory Overview</p>
            <h2>Best-selling and at-risk products</h2>
          </div>
          <div className="admin-filter-row">
            <button type="button" className="toolbar-pill active">All Products</button>
            <button type="button" className="toolbar-pill">Low Stock</button>
            <button type="button" className="toolbar-pill">Out of Stock</button>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Revenue</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Fulfillment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="admin-product-cell">
                    <div className="admin-product-avatar" aria-hidden="true">
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.trend} weekly demand</span>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.revenue}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={statusClassName(product.status)}>
                    {product.status}
                  </span>
                </td>
                <td>{product.fulfillment}</td>
                <td className="table-actions">
                  <button type="button">Edit</button>
                  <button type="button" className="ghost-btn">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default AdminProducts