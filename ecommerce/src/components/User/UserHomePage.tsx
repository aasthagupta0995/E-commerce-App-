import React, { useEffect, useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  rating: number
  reviews: number
  delivery: string
  image: string
  description: string
}

type ApiProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Noise-Canceling Headphones',
    category: 'Electronics',
    price: 129.99,
    rating: 4.7,
    reviews: 132,
    delivery: 'Free delivery by tomorrow',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    description: 'Immersive over-ear headphones with all-day comfort and crystal-clear calls.',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    price: 89.5,
    rating: 4.4,
    reviews: 88,
    delivery: 'Arrives in 2 days',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    description: 'Track heart rate, workouts, and sleep with smart reminders and GPS support.',
  },
  {
    id: 3,
    name: 'Minimal Linen Shirt',
    category: 'Fashion',
    price: 34.0,
    rating: 4.5,
    reviews: 64,
    delivery: 'Free delivery on orders above $40',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Breathable premium linen shirt with a clean modern silhouette.',
  },
  {
    id: 4,
    name: 'Ceramic Dinner Set',
    category: 'Home',
    price: 56.75,
    rating: 4.6,
    reviews: 71,
    delivery: 'Arrives in 3 days',
    image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=1000&q=80',
    description: '12-piece handcrafted ceramic dinnerware set for everyday elegance.',
  },
  {
    id: 5,
    name: 'Hydrating Skin Kit',
    category: 'Beauty',
    price: 42.25,
    rating: 4.8,
    reviews: 109,
    delivery: 'Same day delivery available',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    description: 'A complete hydration routine for soft, healthy, and glowing skin.',
  },
  {
    id: 6,
    name: 'Air Purifier Pro',
    category: 'Home',
    price: 139.0,
    rating: 4.3,
    reviews: 53,
    delivery: 'Free delivery by Friday',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80',
    description: 'HEPA-grade filtration with whisper-quiet operation for cleaner indoor air.',
  },
  {
    id: 7,
    name: 'Classic Sneaker',
    category: 'Fashion',
    price: 64.0,
    rating: 4.4,
    reviews: 95,
    delivery: 'Arrives in 2 days',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    description: 'Timeless daily-wear sneaker designed for comfort and street style.',
  },
  {
    id: 8,
    name: 'Vitamin C Face Serum',
    category: 'Beauty',
    price: 22.99,
    rating: 4.7,
    reviews: 126,
    delivery: 'Free delivery by tomorrow',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80',
    description: 'Brightening antioxidant serum to even skin tone and boost radiance.',
  },
  {
    id: 9,
    name: 'Portable Blender',
    category: 'Home',
    price: 39.99,
    rating: 4.3,
    reviews: 76,
    delivery: 'Arrives in 1-2 days',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=1000&q=80',
    description: 'USB-rechargeable blender perfect for smoothies at home or on the go.',
  },
  {
    id: 10,
    name: 'Wireless Gaming Mouse',
    category: 'Electronics',
    price: 49.95,
    rating: 4.5,
    reviews: 114,
    delivery: 'Free delivery by tomorrow',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1000&q=80',
    description: 'Ultra-responsive ergonomic mouse with customizable DPI and RGB lighting.',
  },
  {
    id: 11,
    name: 'Leather Crossbody Bag',
    category: 'Fashion',
    price: 58.5,
    rating: 4.6,
    reviews: 84,
    delivery: 'Arrives in 2 days',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
    description: 'Compact premium leather bag with multiple pockets and adjustable strap.',
  },
  {
    id: 12,
    name: 'Aloe Gel Moisturizer',
    category: 'Beauty',
    price: 18.75,
    rating: 4.4,
    reviews: 61,
    delivery: 'Same day delivery available',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=80',
    description: 'Lightweight soothing moisturizer that hydrates without leaving residue.',
  },
]

const deliveryHints = [
  'Free delivery by tomorrow',
  'Arrives in 2 days',
  'Free delivery on orders above $40',
  'Same day delivery available',
  'Free delivery by Friday',
]

const normalizeCategory = (value: string) => {
  const parts = value
    .split(/\s|-/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
  return parts.join(' ')
}

const mapApiProducts = (items: ApiProduct[]): Product[] => {
  return items.map((item) => ({
    id: item.id + 1000,
    name: item.title,
    category: normalizeCategory(item.category),
    price: Number(item.price),
    rating: Number(item.rating?.rate ?? 4),
    reviews: Number(item.rating?.count ?? 0),
    delivery: deliveryHints[item.id % deliveryHints.length],
    image: item.image,
    description: item.description,
  }))
}

const UserHomePage = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | string>('All')
  const [sortBy, setSortBy] = useState<'popular' | 'low-high' | 'high-low' | 'newest'>('popular')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    let isActive = true

    const loadProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error('Unable to fetch products')
        }

        const data = (await response.json()) as ApiProduct[]
        if (!isActive) {
          return
        }

        const transformed = mapApiProducts(data)
        const merged = [...fallbackProducts, ...transformed]
        setProducts(merged)
        setError('')
      } catch {
        if (!isActive) {
          return
        }
        setProducts(fallbackProducts)
        setError('Live products are unavailable right now. Showing curated collection.')
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  const featuredProducts = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 5)
  }, [products])

  useEffect(() => {
    if (featuredProducts.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredProducts.length)
    }, 4000)

    return () => {
      window.clearInterval(timer)
    }
  }, [featuredProducts.length])

  useEffect(() => {
    if (slideIndex >= featuredProducts.length) {
      setSlideIndex(0)
    }
  }, [featuredProducts.length, slideIndex])

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map((item) => item.category)))]
  }, [products])

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
      if (sortBy === 'newest') {
        return b.id - a.id
      }
      return b.rating - a.rating
    })
  }, [category, products, search, sortBy])

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
  }, [cart, products])

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find((item) => item.id === Number(id))
        if (!product) {
          return null
        }
        return { product, qty }
      })
      .filter((entry): entry is { product: Product; qty: number } => entry !== null)
      .sort((a, b) => b.qty - a.qty)
  }, [cart, products])

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

  const currentSlide = featuredProducts[slideIndex]

  const nextSlide = () => {
    setSlideIndex((prev) => {
      if (featuredProducts.length === 0) {
        return 0
      }
      return (prev + 1) % featuredProducts.length
    })
  }

  const previousSlide = () => {
    setSlideIndex((prev) => {
      if (featuredProducts.length === 0) {
        return 0
      }
      return (prev - 1 + featuredProducts.length) % featuredProducts.length
    })
  }

  return (
    <main className="user-shop-page">
      <section className="user-shop-hero">
        <div className="user-shop-copy">
          <p className="eyebrow">User Shopping Page</p>
          <h1>Explore, discover, and shop with confidence</h1>
          <p>
            Real products from a live API, curated picks, smart filtering, and a responsive cart.
            Everything stays smooth from browse to checkout.
          </p>
          <div className="user-shop-stats">
            <article>
              <strong>{products.length}</strong>
              <span>Total Products</span>
            </article>
            <article>
              <strong>{categories.length - 1}</strong>
              <span>Categories</span>
            </article>
            <article>
              <strong>{cartCount}</strong>
              <span>Items in Cart</span>
            </article>
          </div>
          {error ? <p className="shop-alert">{error}</p> : null}
        </div>
        <div className="user-shop-cart-card" aria-live="polite">
          <h2>Your Cart</h2>
          <p>{cartCount} item(s) selected</p>
          <strong>${cartTotal.toFixed(2)}</strong>
          {cartItems.length > 0 ? (
            <ul className="mini-cart-list">
              {cartItems.slice(0, 3).map(({ product, qty }) => (
                <li key={product.id}>
                  <span>{product.name}</span>
                  <span>x{qty}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cart-helper">Your cart is empty. Add products to continue.</p>
          )}
          <button type="button" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
      </section>

      <section className="user-shop-slider" aria-label="Featured products slider">
        {currentSlide ? (
          <>
            <div className="slider-image-wrap">
              <img src={currentSlide.image} alt={currentSlide.name} />
            </div>
            <div className="slider-content">
              <p className="eyebrow">Featured Pick</p>
              <h2>{currentSlide.name}</h2>
              <p>{currentSlide.description}</p>
              <p className="user-shop-meta">
                {currentSlide.rating.toFixed(1)} rating ({currentSlide.reviews} reviews) | {currentSlide.delivery}
              </p>
              <div className="slider-actions">
                <strong>${currentSlide.price.toFixed(2)}</strong>
                <button type="button" onClick={() => handleAddToCart(currentSlide.id)}>
                  Add to Cart
                </button>
              </div>
              <div className="slider-controls">
                <button type="button" onClick={previousSlide} aria-label="Previous slide">
                  Prev
                </button>
                {featuredProducts.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={index === slideIndex ? 'dot active' : 'dot'}
                    onClick={() => setSlideIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
                <button type="button" onClick={nextSlide} aria-label="Next slide">
                  Next
                </button>
              </div>
            </div>
          </>
        ) : null}
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
          onChange={(event) => setCategory(event.target.value as 'All' | string)}
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
          onChange={(event) => setSortBy(event.target.value as 'popular' | 'low-high' | 'high-low' | 'newest')}
          aria-label="Sort products"
        >
          <option value="popular">Most Popular</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </section>

      <section className="user-shop-grid" aria-label="Products list">
        {loading ? <p className="loading-banner">Loading live products...</p> : null}
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
                  <p className="product-description">{item.description}</p>
                  <p className="user-shop-meta">
                    {item.rating.toFixed(1)} rating ({item.reviews}) | {item.delivery}
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