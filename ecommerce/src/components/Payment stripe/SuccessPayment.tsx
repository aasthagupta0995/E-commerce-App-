import { Link } from 'react-router-dom'
import './PaymentUI.css'

const SuccessPayment = () => {
  return (
    <main className="payment-page">
      <section className="payment-shell">
        <article className="payment-card summary-card">
          <p className="payment-kicker">Payment Complete</p>
          <h1>Thank you. Your order is confirmed.</h1>
          <p>
            Stripe successfully processed your payment. A confirmation email will be sent if an email
            address was provided during checkout.
          </p>
          <ul className="feature-list">
            <li>Transaction status: Success</li>
            <li>Next step: Continue shopping or review your profile</li>
          </ul>
          <Link className="checkout-btn" to="/products">
            Continue shopping
          </Link>
          <Link className="back-link" to="/user/homepage">
            Go to user home
          </Link>
        </article>
      </section>
    </main>
  )
}

export default SuccessPayment