/**
 * Footer — glass panel site footer.
 *
 * Layout:
 * - Brand name + tagline
 * - Three columns: Quick Links, Contact Info, Social
 * - Copyright line + back-to-top button
 */
import { Link } from 'react-router-dom';
import { BRAND_NAME, TAGLINE, CONTACT } from '../../constants';
import '../../styles/components/Footer.css';

/** Quick links for the footer */
const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  /** Smooth scroll to top of page */
  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* ---- Top section ---- */}
        <div className="footer__top">
          {/* Brand block */}
          <div className="footer__brand">
            <h3 className="footer__brand-name">{BRAND_NAME}</h3>
            <p className="footer__tagline">{TAGLINE}</p>
          </div>

          {/* Quick Links column */}
          <div className="footer__column">
            <h4 className="footer__column-title">Quick Links</h4>
            <nav className="footer__links" aria-label="Footer navigation">
              {QUICK_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="footer__link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="footer__column">
            <h4 className="footer__column-title">Contact</h4>

            {/* Phone */}
            <div className="footer__contact-item">
              <svg
                className="footer__contact-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{CONTACT.phone}</span>
            </div>

            {/* Email */}
            <div className="footer__contact-item">
              <svg
                className="footer__contact-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <span>{CONTACT.email}</span>
            </div>

            {/* Address */}
            <div className="footer__contact-item">
              <svg
                className="footer__contact-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{CONTACT.address}</span>
            </div>
          </div>

          {/* Social column */}
          <div className="footer__column">
            <h4 className="footer__column-title">Follow Us</h4>
            <div className="footer__social">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                className="footer__social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                className="footer__social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.4L8 4H4z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                className="footer__social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="footer__divider" />

        {/* ---- Bottom section ---- */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>

          <button
            className="footer__back-to-top"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            {/* Up arrow icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
