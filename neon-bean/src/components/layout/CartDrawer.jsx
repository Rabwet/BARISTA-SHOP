/**
 * CartDrawer — slide-in cart panel.
 *
 * Desktop: slides in from the right.
 * Mobile (<768px): bottom sheet (slides up from bottom).
 *
 * Features:
 * - Displays cart items with quantity controls
 * - Shows subtotal per item and total
 * - "Proceed to Checkout" button links to /checkout
 * - Closes on overlay click, Esc key, or close button
 * - Uses useCart() for all cart state mutations
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CURRENCY_SYMBOL } from '../../constants';
import '../../styles/components/CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, dispatch } = useCart();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersReduced = useReducedMotion();

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [isOpen]);

  /* Determine slide direction based on viewport */
  const drawerVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : isMobile
      ? {
          hidden: { y: '100%' },
          visible: { y: 0 },
          exit: { y: '100%' },
        }
      : {
          hidden: { x: '100%' },
          visible: { x: 0 },
          exit: { x: '100%' },
        };

  /** Get initials for item image placeholder */
  function getInitials(name) {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  /** Quantity change handler */
  function handleQuantity(item, delta) {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, size: item.size, quantity: item.quantity + delta },
    });
  }

  /** Remove item from cart */
  function handleRemove(item) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: item.id, size: item.size },
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <header className="cart-drawer__header">
              <h2 className="cart-drawer__title">Your Cart</h2>
              <button
                className="cart-drawer__close"
                onClick={onClose}
                aria-label="Close cart"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Items list */}
            <div className="cart-drawer__items">
              {cart.items.length === 0 ? (
                /* Empty state */
                <div className="cart-drawer__empty">
                  <svg
                    className="cart-drawer__empty-icon"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p>Your cart is empty</p>
                  <Link
                    to="/menu"
                    className="btn-primary"
                    onClick={onClose}
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                /* Cart items */
                cart.items.map((item) => (
                  <article className="cart-item" key={item.key}>
                    {/* Image placeholder with initials */}
                    <div className="cart-item__image">
                      {getInitials(item.name)}
                    </div>

                    {/* Item details */}
                    <div className="cart-item__details">
                      <span className="cart-item__name">{item.name}</span>
                      <span className="cart-item__size">{item.size}</span>
                      <span className="cart-item__price">
                        {CURRENCY_SYMBOL} {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity controls + remove */}
                    <div className="cart-item__controls">
                      <div className="cart-item__quantity">
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => handleQuantity(item, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="cart-item__qty-value">
                          {item.quantity}
                        </span>
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => handleQuantity(item, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => handleRemove(item)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        ×
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Footer — only show when cart has items */}
            {cart.items.length > 0 && (
              <footer className="cart-drawer__footer">
                <div className="cart-drawer__total">
                  <span className="cart-drawer__total-label">Total</span>
                  <span className="cart-drawer__total-value">
                    {CURRENCY_SYMBOL} {cart.totalPrice.toLocaleString()}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  className="btn-primary cart-drawer__checkout"
                  onClick={onClose}
                >
                  Proceed to Checkout
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
