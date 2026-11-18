import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/common/Toast';
import { CURRENCY_SYMBOL } from '../constants';

export default function Checkout() {
  const { cart, dispatch } = useCart();
  const { addToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tableOrAddress: '',
    notes: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = 'NB-' + Math.floor(100000 + Math.random() * 900000);
      setOrderPlaced({
        orderNumber,
        items: [...cart.items],
        total: cart.totalPrice,
        paymentMethod,
        customerName: formData.name,
        phone: formData.phone,
      });
      dispatch({ type: 'CLEAR_CART' });
      setIsProcessing(false);
      addToast('Order placed successfully! Brewing right now.', 'success');
    }, 1200);
  }

  if (orderPlaced) {
    return (
      <div className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(57, 255, 20, 0.1)',
                border: '2px solid var(--neon)',
                color: 'var(--neon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-md)',
                boxShadow: 'var(--neon-glow)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-xs)' }}>
              Order Confirmed!
            </h1>
            <p style={{ color: 'var(--neon)', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
              Order #{orderPlaced.orderNumber}
            </p>

            <p style={{ marginBottom: 'var(--space-xl)' }}>
              Thank you, <strong>{orderPlaced.customerName}</strong>. Our baristas are preparing your order.
              {orderPlaced.paymentMethod === 'mpesa' && (
                <span style={{ display: 'block', marginTop: '8px', fontSize: 'var(--text-sm)', color: 'var(--beige-400)' }}>
                  An M-Pesa prompt has been sent to {orderPlaced.phone}.
                </span>
              )}
            </p>

            <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: 'var(--space-md)', borderRadius: '12px', marginBottom: 'var(--space-xl)' }}>
              <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)', color: 'var(--beige-200)', fontSize: 'var(--text-sm)' }}>
                Items Ordered:
              </div>
              {orderPlaced.items.map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span>{item.quantity}x {item.name} ({item.size})</span>
                  <span>{CURRENCY_SYMBOL} {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '8px', color: 'var(--neon)' }}>
                <span>Total</span>
                <span>{CURRENCY_SYMBOL} {orderPlaced.total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
              <Link to="/menu" className="btn-primary">
                Order More
              </Link>
              <Link to="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-3xl))', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: 'var(--space-2xl)' }}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--beige-400)', opacity: 0.5, margin: '0 auto var(--space-md)' }}
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>Your Cart is Empty</h2>
            <p style={{ marginBottom: 'var(--space-xl)' }}>
              You don’t have any coffees or pastries in your cart yet. Explore our specialty drinks and place an order!
            </p>
            <Link to="/menu" className="btn-primary">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', minHeight: '100vh' }}>
      <div className="container">
        <header style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 style={{ marginBottom: 'var(--space-sm)' }}>Checkout</h1>
          <p>Review your selection, enter your pickup/table details, and confirm.</p>
        </header>

        <form onSubmit={handlePlaceOrder}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)' }}>
            {/* Left: Customer Info & Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div className="glass-card">
                <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)', color: 'var(--beige-200)' }}>
                  1. Contact & Pickup Details
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="glass-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', marginBottom: '6px' }}>
                      Phone Number (M-Pesa) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="glass-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', marginBottom: '6px' }}>
                      Table Number / Pickup Note
                    </label>
                    <input
                      type="text"
                      name="tableOrAddress"
                      placeholder="e.g. Table 4 or Takeaway at Counter"
                      value={formData.tableOrAddress}
                      onChange={handleChange}
                      className="glass-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', marginBottom: '6px' }}>
                      Special Instructions
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Extra hot, oat milk preferred"
                      value={formData.notes}
                      onChange={handleChange}
                      className="glass-input"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass-card">
                <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)', color: 'var(--beige-200)' }}>
                  2. Payment Method
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: paymentMethod === 'mpesa' ? 'rgba(57, 255, 20, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${paymentMethod === 'mpesa' ? 'var(--neon)' : 'var(--glass-border)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={() => setPaymentMethod('mpesa')}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>M-Pesa (STK Push / Till)</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--beige-400)' }}>Instant mobile prompt to your phone</div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: paymentMethod === 'card' ? 'rgba(57, 255, 20, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${paymentMethod === 'card' ? 'var(--neon)' : 'var(--glass-border)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>Credit / Debit Card</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--beige-400)' }}>Visa, Mastercard, Amex</div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: paymentMethod === 'cash' ? 'rgba(57, 255, 20, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${paymentMethod === 'cash' ? 'var(--neon)' : 'var(--glass-border)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>Pay at Counter</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--beige-400)' }}>Cash or card when receiving your coffee</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="glass-card" style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-md))' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)', color: 'var(--beige-200)' }}>
                  Order Summary ({cart.totalItems} items)
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', maxHeight: '300px', overflowY: 'auto' }}>
                  {cart.items.map((item) => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(239, 226, 204, 0.08)' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--beige-200)', fontSize: 'var(--text-sm)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--beige-400)' }}>
                          Size: {item.size} × {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>
                        {CURRENCY_SYMBOL} {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: 'var(--text-sm)', color: 'var(--beige-400)' }}>
                  <span>Subtotal</span>
                  <span>{CURRENCY_SYMBOL} {cart.totalPrice.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-md)', fontSize: 'var(--text-sm)', color: 'var(--beige-400)' }}>
                  <span>Service / Tax</span>
                  <span style={{ color: 'var(--neon)' }}>Included</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--beige-200)', borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--space-md)' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--neon)' }}>{CURRENCY_SYMBOL} {cart.totalPrice.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isProcessing ? 'Processing Order...' : `Pay ${CURRENCY_SYMBOL} ${cart.totalPrice.toLocaleString()}`}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

