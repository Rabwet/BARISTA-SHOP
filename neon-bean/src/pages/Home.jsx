import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import menuData from '../data/menu.json';
import MenuCard from '../components/menu/MenuCard';
import CupFallback from '../components/three/CupFallback';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { TAGLINE, CONTACT } from '../constants';

const CupCanvas = lazy(() => import('../components/three/CupCanvas'));

export default function Home() {
  const scrollProgress = useScrollProgress();
  const featuredItems = menuData.slice(0, 3);

  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(57, 255, 20, 0.1)',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                color: 'var(--neon)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-md)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--neon)', boxShadow: 'var(--neon-glow)' }} />
              Nairobi Specialty Coffee
            </div>

            <h1 style={{ marginBottom: 'var(--space-md)', lineHeight: 1.1 }}>
              {TAGLINE}
            </h1>

            <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xl)', color: 'var(--beige-400)' }}>
              Hand-harvested high-altitude Kenyan Arabica, roasted micro-batch daily, served in an immersive neon sanctuary on Kimathi Street.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <Link to="/menu" className="btn-primary">
                Explore Menu
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact" className="btn-secondary">
                Visit Us
              </Link>
            </div>
          </motion.div>

          {/* Right 3D Cup Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              height: '480px',
              width: '100%',
              position: 'relative',
              borderRadius: 'var(--glass-radius)',
              overflow: 'hidden',
              background: 'radial-gradient(circle at center, rgba(57, 255, 20, 0.05) 0%, transparent 70%)',
            }}
          >
            <Suspense fallback={<CupFallback />}>
              <CupCanvas scrollProgress={scrollProgress} />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* ================= CRAFT PILLARS ================= */}
      <section className="section" style={{ background: 'rgba(20, 11, 7, 0.6)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>The Neon Bean Experience</h2>
            <p style={{ margin: '0 auto' }}>From volcanic mountain soil to your porcelain cup, precision guides every pour.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
            <div className="glass-card">
              <div style={{ color: 'var(--neon)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                01
              </div>
              <h3 style={{ marginBottom: 'var(--space-xs)' }}>Mount Kenya Slopes</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Single-origin SL28 and SL34 varietals grown at 1,900 meters in Nyeri, naturally unlocking bright citrus, blackcurrant, and cane sugar sweetness.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--neon)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                02
              </div>
              <h3 style={{ marginBottom: 'var(--space-xs)' }}>Micro-Batch Roasting</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Small-batch drum roasting fine-tuned for optimal caramelization and nuanced acidity. Always freshly degassed and dialed in every morning.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--neon)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                03
              </div>
              <h3 style={{ marginBottom: 'var(--space-xs)' }}>Cyber-Café Culture</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                High-speed fiber, cozy ambient lighting, and rich lo-fi acoustics designed for coders, thinkers, night owls, and espresso purists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED MENU ================= */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-xs)' }}>Signature Brews</h2>
              <p>Hand-crafted favorites loved by our Nairobi regulars.</p>
            </div>
            <Link to="/menu" className="btn-secondary btn-sm">
              View All Items ({menuData.length})
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOCATION & HOURS BANNER ================= */}
      <section className="section" style={{ paddingBottom: 'var(--space-3xl)' }}>
        <div className="container">
          <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>
                Drop by our espresso bar
              </h3>
              <p style={{ marginBottom: 'var(--space-md)' }}>
                Located right in the heartbeat of Nairobi on {CONTACT.address}.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <Link to="/contact" className="btn-primary btn-sm">
                  Find on Map
                </Link>
                <a href={`tel:${CONTACT.phone}`} style={{ color: 'var(--beige-200)', fontSize: 'var(--text-sm)' }}>
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: 'var(--space-lg)' }}>
              <div style={{ fontWeight: 600, color: 'var(--neon)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', fontSize: 'var(--text-xs)', letterSpacing: '1px' }}>
                Opening Hours
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-sm)', color: 'var(--beige-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Mon – Fri</span>
                  <span style={{ color: 'var(--beige-400)' }}>6:30 AM – 9:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Saturday</span>
                  <span style={{ color: 'var(--beige-400)' }}>7:00 AM – 10:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sunday</span>
                  <span style={{ color: 'var(--beige-400)' }}>8:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
