import { Link } from 'react-router-dom'
import './PaymentUI.css'

const FailurePayment = () => {
  return (
    <main className="payment-page">
      <section className="payment-shell">
        <article className="payment-card summary-card">
          <p className="payment-kicker">Payment Not Completed</p>
          <h1>Your payment was canceled or failed.</h1>
          <p>
            No charges were captured. You can return to checkout and try again with another card or
            payment method.
          </p>
          <ul className="feature-list">
            <li>Transaction status: Not completed</li>
            <li>Next step: Retry checkout</li>
          </ul>
          <Link className="checkout-btn" to="/user/payment">
            Retry payment
          </Link>
          <Link className="back-link" to="/products">
            Back to products
          </Link>
        </article>
      </section>
    </main>
  )
}

export default FailurePayment