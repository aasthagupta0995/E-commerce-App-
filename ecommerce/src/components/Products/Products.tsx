import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
  const products = [
    {
      name: 'AeroFit Running Shoes',
      category: 'Footwear',
      price: '$89',
      description: 'Ultra-light cushioning and breathable mesh for high-mile performance.',
    },
    {
      name: 'Urban Daypack Pro',
      category: 'Bags',
      price: '$64',
      description: 'Weather-resistant daypack with dedicated laptop sleeve and anti-theft pocket.',
    },
    {
      name: 'CloudSoft Hoodie',
      category: 'Apparel',
      price: '$54',
      description: 'Premium cotton blend hoodie tailored for comfort and all-day wear.',
    },
    {
      name: 'SmartSteel Bottle',
      category: 'Accessories',
      price: '$29',
      description: 'Insulated bottle keeps drinks cold for 18 hours and hot for 10 hours.',
    },
  ]

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <p className="eyebrow">Curated Collection</p>
        <h1>Premium products built for modern lifestyles</h1>
        <p>
          Discover high-quality essentials from footwear to accessories, selected for durability,
          style, and everyday utility.
        </p>
        <div className="hero-actions">
          <Link to="/user/signUp" className="btn-primary">Start Shopping</Link>
          <Link to="/survey" className="btn-secondary">Share Feedback</Link>
        </div>
      </section>

      <section className="catalog-grid" aria-label="Product catalog">
        {products.map((product) => (
          <article key={product.name} className="catalog-card">
            <span className="product-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="catalog-footer">
              <strong>{product.price}</strong>
              <button type="button">View Details</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Products