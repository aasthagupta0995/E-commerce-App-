import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpRequest } from '../../lib/http-request'

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

type UserSession = {
  email?: string
  name?: string
  role?: string
}


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
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | string>('All')
  const [sortBy, setSortBy] = useState<'popular' | 'low-high' | 'high-low' | 'newest'>('popular')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [slideIndex, setSlideIndex] = useState(0)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const session = useMemo<UserSession>(() => {
    const raw = localStorage.getItem('user_session')
    if (!raw) {
      return {}
    }

    try {
      return JSON.parse(raw) as UserSession
    } catch {
      return {}
    }
  }, [])

  const cartStorageKey = useMemo(() => {
    return session.email ? `user_cart_${session.email}` : 'user_cart_guest'
  }, [session.email])

  useEffect(() => {
    const rawCart = localStorage.getItem(cartStorageKey)
    if (!rawCart) {
      return
    }

    try {
      setCart(JSON.parse(rawCart) as Record<number, number>)
    } catch {
      localStorage.removeItem(cartStorageKey)
    }
  }, [cartStorageKey])

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart))
  }, [cart, cartStorageKey])

  useEffect(() => {
    let isActive = true

    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = (await httpRequest.get('https://fakestoreapi.com/products')) as ApiProduct[]
        if (!isActive) {
          return
        }

        const transformed = mapApiProducts(data)
        const merged = [ ...transformed]
        setProducts(merged)
        setError('')
      } catch {
        if (!isActive) {
          return
        }
        setProducts([])
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

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.qty, 0)
  }, [cartItems])

  const shipping = cartItems.length === 0 ? 0 : subtotal > 120 ? 0 : 12.5
  const estimatedTax = subtotal * 0.08
  const grandTotal = subtotal + shipping + estimatedTax

  const handleAddToCart = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }))
    setCheckoutMessage('')
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

  const handleClearCart = () => {
    setCart({})
    setCheckoutMessage('Cart cleared.')
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return
    }

    setCheckoutMessage('Order summary prepared. Payment integration is the next step.')
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

  const handleSignOut = () => {
    localStorage.removeItem('user_session')
    navigate('/user/login')
  }

  return (
    <main className="user-shop-page">
      <section className="user-shop-topbar">
        <div>
          <p className="eyebrow">Welcome Back</p>
          <h2>{session.name ? `${session.name}, your store is ready.` : 'Your store is ready.'}</h2>
          <p>Browse live products, save your cart automatically, and review your order in one place.</p>
        </div>
        <div className="topbar-actions">
          <button type="button" className="topbar-secondary" onClick={handleClearCart} disabled={cartItems.length === 0}>
            Clear Cart
          </button>
          <button type="button" className="cart-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </section>

      <section className="user-shop-hero">
        <div className="user-shop-copy">
          <p className="eyebrow">Shopping Experience</p>
          <h1>Explore, discover, and shop with confidence</h1>
          <p>
            Real products from a live API, curated essentials for backup, smart filtering, and a responsive cart.
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
          {checkoutMessage ? <p className="shop-success">{checkoutMessage}</p> : null}
        </div>
        <div className="user-shop-cart-card" aria-live="polite">
          <h2>Order Summary</h2>
          <p>{cartCount} item(s) selected</p>
          <strong>${grandTotal.toFixed(2)}</strong>
          {cartItems.length > 0 ? (
            <ul className="mini-cart-list">
              {cartItems.slice(0, 4).map(({ product, qty }) => (
                <li key={product.id}>
                  <span>{product.name} x{qty}</span>
                  <span>${(product.price * qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cart-helper">Your cart is empty. Add products to continue.</p>
          )}
          <div className="summary-lines">
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div>
              <span>Tax</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>
          </div>
          <button type="button" disabled={cartItems.length === 0} onClick={handleCheckout}>
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