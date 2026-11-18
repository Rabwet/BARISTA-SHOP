import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '../data/gallery.json';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fallback coffee gradients for photo placeholders
  const gradients = [
    'linear-gradient(135deg, #3d1e10 0%, #6d3a1f 50%, #241209 100%)',
    'linear-gradient(135deg, #1b2838 0%, #2b455f 50%, #151d26 100%)',
    'linear-gradient(135deg, #4d3822 0%, #8c6b41 50%, #2d2012 100%)',
    'linear-gradient(135deg, #1e3324 0%, #355e42 50%, #111e15 100%)',
    'linear-gradient(135deg, #48233c 0%, #7d3f69 50%, #2a1423 100%)',
  ];

  return (
    <div className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <header style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 style={{ marginBottom: 'var(--space-sm)' }}>The Neon Vibe</h1>
          <p>
            Moments captured at our Nairobi espresso bar — the grind, the pours, the night energy, and our coffee family.
          </p>
        </header>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {galleryData.map((item, index) => {
            const grad = gradients[index % gradients.length];
            return (
              <motion.div
                key={item.id}
                className="glass-card"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedPhoto(item)}
                style={{
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  borderRadius: 'var(--glass-radius)',
                }}
              >
                {/* Photo area */}
                <div
                  style={{
                    height: '240px',
                    background: grad,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: 'var(--space-md)',
                    textAlign: 'center',
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--beige-400)', opacity: 0.6, marginBottom: 'var(--space-xs)' }}
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neon)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 600,
                    }}
                  >
                    Frame #{item.id}
                  </span>
                </div>

                {/* Caption */}
                <div style={{ padding: 'var(--space-md)' }}>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--beige-200)', margin: 0 }}>
                    {item.alt}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-modal)',
              background: 'rgba(20, 11, 7, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-md)',
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                maxWidth: '600px',
                width: '100%',
                padding: 'var(--space-xl)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="btn-icon"
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: 'var(--space-md)',
                  right: 'var(--space-md)',
                }}
                aria-label="Close photo preview"
              >
                ✕
              </button>

              <div
                style={{
                  height: '300px',
                  borderRadius: '12px',
                  background: gradients[(selectedPhoto.id - 1) % gradients.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-md)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--neon)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: '8px' }}
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <div style={{ color: 'var(--beige-200)', fontSize: 'var(--text-sm)' }}>
                    Photo #{selectedPhoto.id}
                  </div>
                </div>
              </div>

              <h3 style={{ marginBottom: 'var(--space-xs)' }}>{selectedPhoto.alt}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--beige-400)' }}>
                Taken at Neon Bean Coffee bar, Kimathi Street, Nairobi.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

