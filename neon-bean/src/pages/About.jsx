import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';

export default function About() {
  return (
    <div className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <header style={{ maxWidth: '720px', marginBottom: 'var(--space-2xl)' }}>
          <div
            style={{
              color: 'var(--neon)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-sm)',
            }}
          >
            The Story Behind The Cup
          </div>
          <h1 style={{ marginBottom: 'var(--space-md)' }}>About {BRAND_NAME}</h1>
          <p style={{ fontSize: 'var(--text-lg)' }}>
            Born from Nairobi’s bustling energy and Kenya’s century-old specialty coffee heritage. We exist at the crossroads of ancient volcanic soil and futuristic neon aesthetics.
          </p>
        </header>

        {/* Story Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)', color: 'var(--neon)' }}>
              Direct From Mount Kenya
            </h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              Kenya produces some of the most celebrated coffees on earth, yet traditionally much of the highest grade AA and AB beans were exported without ever reaching local cups.
            </p>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              {BRAND_NAME} was founded to reverse that narrative. We partner directly with smallholder coffee cooperatives in Nyeri, Kirinyaga, and Embu, ensuring farmers earn premium prices while Nairobi residents and visitors experience world-class coffee right here at home.
            </p>
            <p>
              Every batch is roasted in small quantities right behind our bar, preserving vibrant notes of blackcurrant, Meyer lemon, cacao nibs, and honey.
            </p>
          </div>

          <div
            className="glass"
            style={{
              padding: 'var(--space-xl)',
              background: 'radial-gradient(circle at top right, rgba(57, 255, 20, 0.08), transparent 70%)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h3 style={{ marginBottom: 'var(--space-md)' }}>The Barista Creed</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <h4 style={{ color: 'var(--beige-200)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                  Gram-by-Gram Calibration
                </h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  We weigh dry dose, monitor liquid yield, and time every extraction to within tenths of a second.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--beige-200)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                  Silky Microfoam Perfection
                </h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Fresh Kenyan whole milk steamed to exactly 65°C to preserve natural sweetness and create glossy latte art.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--beige-200)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                  20-Hour Slow Cold Brew
                </h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Steeped in triple-filtered cold water for 20 hours to extract deep chocolatey sweetness with nearly zero bitterness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <section style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>What Drives Us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)' }}>
            <div className="glass-card">
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--neon)', marginBottom: 'var(--space-xs)' }}>Terroir</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Rich volcanic loam and high altitudes give Kenyan coffee its world-famous winey acidity and complex body.
              </p>
            </div>

            <div className="glass-card">
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--neon)', marginBottom: 'var(--space-xs)' }}>Community</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                A vibrant hub where entrepreneurs, software engineers, creatives, and friends gather under warm neon lights.
              </p>
            </div>

            <div className="glass-card">
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--neon)', marginBottom: 'var(--space-xs)' }}>Sustainability</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                100% biodegradable takeaway cups, zero single-use plastics, and repurposing spent coffee grounds for urban gardens.
              </p>
            </div>

            <div className="glass-card">
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--neon)', marginBottom: 'var(--space-xs)' }}>Mastery</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Continuous training for our baristas in sensory analysis, water chemistry, and brewing science.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Experience It In Person</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto var(--space-lg)' }}>
            Pull up a stool at the counter, chat with our head barista, and taste the difference exceptional coffee makes.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
            <Link to="/menu" className="btn-primary">
              Order Online
            </Link>
            <Link to="/contact" className="btn-secondary">
              Find Our Cafe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
