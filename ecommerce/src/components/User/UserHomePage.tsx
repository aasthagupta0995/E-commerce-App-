import React, { useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  category: 'Electronics' | 'Fashion' | 'Home' | 'Beauty'
  price: number
  rating: number
  delivery: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Noise-Canceling Headphones',
    category: 'Electronics',
    price: 129.99,
    rating: 4.7,
    delivery: 'Free delivery by tomorrow',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    price: 89.5,
    rating: 4.4,
    delivery: 'Arrives in 2 days',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Minimal Linen Shirt',
    category: 'Fashion',
    price: 34.0,
    rating: 4.5,
    delivery: 'Free delivery on orders above $40',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    name: 'Ceramic Dinner Set',
    category: 'Home',
    price: 56.75,
    rating: 4.6,
    delivery: 'Arrives in 3 days',
    image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    name: 'Hydrating Skin Kit',
    category: 'Beauty',
    price: 42.25,
    rating: 4.8,
    delivery: 'Same day delivery available',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    name: 'Air Purifier Pro',
    category: 'Home',
    price: 139.0,
    rating: 4.3,
    delivery: 'Free delivery by Friday',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    name: 'Classic Sneaker',
    category: 'Fashion',
    price: 64.0,
    rating: 4.4,
    delivery: 'Arrives in 2 days',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    name: 'Vitamin C Face Serum',
    category: 'Beauty',
    price: 22.99,
    rating: 4.7,
    delivery: 'Free delivery by tomorrow',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80',
  },
]

const UserHomePage = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | Product['category']>('All')
  const [sortBy, setSortBy] = useState<'popular' | 'low-high' | 'high-low'>('popular')
  const [cart, setCart] = useState<Record<number, number>>({})

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map((item) => item.category)))] as Array<'All' | Product['category']>
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = products.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesSearch = item.name.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'low-high') {
        return a.price - b.price
      }
      if (sortBy === 'high-low') {
        return b.price - a.price
      }
      return b.rating - a.rating
    })
  }, [category, search, sortBy])

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  }, [cart])

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((item) => item.id === Number(id))
      if (!product) {
        return total
      }
      return total + product.price * qty
    }, 0)
  }, [cart])

  const handleAddToCart = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }))
  }

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => {
      if (!prev[id]) {
        return prev
      }

      const next = { ...prev }
      if (next[id] === 1) {
        delete next[id]
      } else {
        next[id] -= 1
      }
      return next
    })
  }

  return (
    <main className="user-shop-page">
      <section className="user-shop-hero">
        <div>
          <p className="eyebrow">User Shopping Page</p>
          <h1>Find what you love, fast and easy</h1>
          <p>
            Explore curated products, filter by category, and build your cart in seconds.
            Designed for a smooth ecommerce shopping experience.
          </p>
        </div>
        <div className="user-shop-cart-card" aria-live="polite">
          <h2>Your Cart</h2>
          <p>{cartCount} item(s) selected</p>
          <strong>${cartTotal.toFixed(2)}</strong>
          <button type="button">Proceed to Checkout</button>
        </div>
      </section>

      <section className="user-shop-controls" aria-label="Product filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search products"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as 'All' | Product['category'])}
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as 'popular' | 'low-high' | 'high-low')}
          aria-label="Sort products"
        >
          <option value="popular">Most Popular</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </section>

      <section className="user-shop-grid" aria-label="Products list">
        {filteredProducts.length === 0 ? (
          <div className="user-shop-empty">
            <h3>No products found</h3>
            <p>Try another search keyword or category.</p>
          </div>
        ) : (
          filteredProducts.map((item) => {
            const quantity = cart[item.id] ?? 0
            return (
              <article key={item.id} className="user-shop-card">
                <img src={item.image} alt={item.name} />
                <div className="user-shop-card-body">
                  <span className="product-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p className="user-shop-meta">
                    {item.rating.toFixed(1)} rating | {item.delivery}
                  </p>
                </div>
                <div className="user-shop-footer">
                  <strong>${item.price.toFixed(2)}</strong>
                  <div>
                    <button type="button" onClick={() => handleRemoveFromCart(item.id)}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => handleAddToCart(item.id)}>
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            )
          })
        )}
      </section>
    </main>
  )
}

export default UserHomePage