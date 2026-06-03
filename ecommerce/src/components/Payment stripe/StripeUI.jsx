import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './PaymentUI.css'

const plans = [
  {
    id: 'starter',
    title: 'Starter Pack',
    subtitle: 'Perfect for single quick orders',
    amount: 20,
    features: ['1 checkout session', 'Email receipt', 'Standard support']
  },
  {
    id: 'growth',
    title: 'Growth Pack',
    subtitle: 'For frequent buyers and upsells',
    amount: 49,
    features: ['Priority processing', 'Advanced receipts', 'Faster support']
  },
  {
    id: 'premium',
    title: 'Premium Pack',
    subtitle: 'High-value checkout with priority care',
    amount: 99,
    features: ['White-glove support', 'High-priority session', 'Invoice exports']
  }
]

const StripeUI = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
  const [selectedPlanId, setSelectedPlanId] = useState('growth')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) || plans[0],
    [selectedPlanId]
  )

  const handlePayment = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const res = await fetch(`${apiBaseUrl}/generate-payment-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: selectedPlan.amount,
          productName: selectedPlan.title,
          customerEmail: email.trim() || undefined
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || `Payment request failed with status ${res.status}`)
      }

      const data = await res.json()
      if (!data?.url) {
        throw new Error('Payment URL was not returned by the server')
      }

      window.location.href = data.url
    } catch (error) {
      console.error('Payment failed:', error)
      setErrorMessage(error.message || 'Unable to start Stripe checkout.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="payment-page">
      <section className="payment-shell">
        <header className="payment-header">
          <p className="payment-kicker">Secure Checkout</p>
          <h1>Complete your payment in minutes</h1>
          <p>
            Choose a package, confirm your details, and continue to Stripe for a secure payment.
          </p>
        </header>

        <div className="payment-layout">
          <article className="payment-card catalog-card">
            <h2>Select a package</h2>
            <div className="plan-grid">
              {plans.map((plan) => (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`plan-card ${selectedPlanId === plan.id ? 'active' : ''}`}
                >
                  <span className="plan-title">{plan.title}</span>
                  <span className="plan-subtitle">{plan.subtitle}</span>
                  <span className="plan-price">${plan.amount}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="payment-card summary-card">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Package</span>
              <strong>{selectedPlan.title}</strong>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <strong>${selectedPlan.amount}.00</strong>
            </div>

            <label htmlFor="payment-email" className="field-label">
              Receipt email (optional)
            </label>
            <input
              id="payment-email"
              className="field-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            <ul className="feature-list">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            {errorMessage ? <p className="payment-error">{errorMessage}</p> : null}

            <button type="button" className="checkout-btn" onClick={handlePayment} disabled={isLoading}>
              {isLoading ? 'Redirecting to Stripe...' : 'Continue to secure payment'}
            </button>

            <Link className="back-link" to="/products">
              Back to products
            </Link>
          </article>
        </div>
      </section>
    </main>
  )
}

export default StripeUI