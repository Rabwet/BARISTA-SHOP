import { useState } from 'react';
import { useToast } from '../components/common/Toast';
import { CONTACT, HOURS } from '../constants';

export default function Contact() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter a message';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Message sent successfully! We will get back to you soon.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 800);
  }

  return (
    <div className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-xl))', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <header style={{ marginBottom: 'var(--space-2xl)' }}>
          <h1 style={{ marginBottom: 'var(--space-sm)' }}>Get in Touch</h1>
          <p>
            Have a question, feedback, catering inquiry, or just want to say hi? We’d love to hear from you.
          </p>
        </header>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)' }}>
          {/* Left Column: Details & Hours & Map */}
          <div>
            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)', color: 'var(--neon)' }}>
                Cafe Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--neon)', flexShrink: 0, marginTop: '2px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>Address</div>
                    <div style={{ color: 'var(--beige-400)', fontSize: 'var(--text-sm)' }}>{CONTACT.address}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--neon)', flexShrink: 0, marginTop: '2px' }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>Phone & WhatsApp</div>
                    <a href={`tel:${CONTACT.phone}`} style={{ color: 'var(--beige-400)', fontSize: 'var(--text-sm)' }}>{CONTACT.phone}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--neon)', flexShrink: 0, marginTop: '2px' }}>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--beige-200)' }}>Email</div>
                    <a href={`mailto:${CONTACT.email}`} style={{ color: 'var(--beige-400)', fontSize: 'var(--text-sm)' }}>{CONTACT.email}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)', color: 'var(--neon)' }}>
                Opening Hours
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', fontSize: 'var(--text-sm)' }}>
                {HOURS.map((h) => (
                  <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(239, 226, 204, 0.08)' }}>
                    <span style={{ color: 'var(--beige-200)' }}>{h.day}</span>
                    <span style={{ color: 'var(--neon)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Frame */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '240px' }}>
              <iframe
                title="Neon Bean Location"
                src={CONTACT.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card">
            <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--beige-200)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Amani Mwangi"
                  className={`glass-input${errors.name ? ' error' : ''}`}
                />
                {errors.name && <span style={{ color: '#ff4444', fontSize: 'var(--text-xs)', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--beige-200)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="amani@example.com"
                  className={`glass-input${errors.email ? ' error' : ''}`}
                />
                {errors.email && <span style={{ color: '#ff4444', fontSize: 'var(--text-xs)', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--beige-200)', marginBottom: '6px' }}>
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 7..."
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--beige-200)', marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry, Feedback, or Event"
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--beige-200)', marginBottom: '6px' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message here..."
                  className={`glass-textarea${errors.message ? ' error' : ''}`}
                />
                {errors.message && <span style={{ color: '#ff4444', fontSize: 'var(--text-xs)', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{ marginTop: 'var(--space-sm)' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

