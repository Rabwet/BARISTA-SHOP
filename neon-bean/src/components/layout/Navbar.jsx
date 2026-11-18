/**
 * Navbar — sticky glass navigation bar.
 *
 * Features:
 * - Brand name link (left)
 * - Desktop nav links with animated neon underline (center/right)
 * - Cart icon with item count badge (far right)
 * - Hamburger button on mobile (<768px) to trigger MobileMenu
 */
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { BRAND_NAME } from '../../constants';
import MobileMenu from './MobileMenu';
import CartDrawer from './CartDrawer';
import '../../styles/components/Navbar.css';

/** Navigation link definitions */
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">
          {/* Brand */}
          <Link to="/" className="navbar__brand">
            {BRAND_NAME}
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {/* Animated neon underline — layoutId enables smooth slide */}
                      {isActive && (
                        <motion.span
                          className="navbar__link-indicator"
                          layoutId="nav-underline"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right section */}
          <div className="navbar__right">
            {/* Cart button */}
            <button
              className="navbar__cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart, ${cart.totalItems} items`}
            >
              {/* Inline SVG shopping bag icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>

              {/* Animated badge */}
              <AnimatePresence>
                {cart.totalItems > 0 && (
                  <motion.span
                    className="navbar__cart-badge"
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {cart.totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger button — mobile only */}
            <button
              className="navbar__hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}
