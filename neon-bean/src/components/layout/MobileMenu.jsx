/**
 * MobileMenu — full-screen glass overlay for mobile navigation.
 *
 * Features:
 * - Fade + slide animation via Framer Motion
 * - Locks body scroll when open
 * - Closes on link click, close button, or Esc key
 * - Large touch targets for mobile usability
 */
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import '../../styles/components/MobileMenu.css';

export default function MobileMenu({ isOpen, onClose, links }) {
  const prefersReduced = useReducedMotion();

  /* Lock body scroll when menu is open */
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [isOpen]);

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Animation variants */
  const overlayVariants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
      };

  const linkVariants = prefersReduced
    ? {}
    : {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: 0.08 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }),
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `mobile-menu__link${isActive ? ' mobile-menu__link--active' : ''}`
                  }
                  onClick={onClose}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
