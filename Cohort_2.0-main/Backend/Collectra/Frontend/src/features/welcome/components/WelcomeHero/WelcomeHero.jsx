import { Link } from "react-router-dom";
import "./WelcomeHero.scss";

// Particle data — each particle has a color variant
const PARTICLES = [
  ...Array(8).fill("cyan"),
  ...Array(7).fill("violet"),
  ...Array(5).fill("emerald"),
];

// Mock card data for app preview
const PREVIEW_CARDS = [
  { id: 1, img: "1" },
  { id: 2, img: "2" },
  { id: 3, img: "3" },
  { id: 4, img: "4" },
  { id: 5, img: "5" },
  { id: 6, img: "6" },
];

// Sidebar nav items for preview
const PREVIEW_NAV = [
  { active: true },
  { active: false },
  { active: false },
  { active: false },
  { active: false },
];

const WelcomeHero = () => {
  return (
    <section className="hero-section" id="hero">
      {/* ── Background Effects ── */}
      <div className="hero-bg">
        <div className="hero-bg-glow-primary" />
        <div className="hero-bg-glow-secondary" />
        <div className="hero-bg-grid" />
        <div className="hero-bg-particles">
          {PARTICLES.map((color, i) => (
            <span key={i} className={`particle particle--${color}`} />
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="hero-content">

        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Now with AI-powered highlights</span>
          <span className="hero-badge-arrow">→</span>
        </div>

        {/* Heading */}
        <h1 className="hero-heading">
          <span className="hero-heading-line1">Save everything.</span>
          <span className="hero-heading-line2">Remember anything.</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subheading">
          Collectra is your <strong>personal knowledge vault</strong> — save
          articles, videos, PDFs, and tweets. Organize them into collections,
          generate AI highlights, and rediscover what matters.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <Link to="/register">
            <button className="hero-cta-primary">
              Start collecting for free
              <span className="hero-cta-primary-icon">
                <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </span>
            </button>
          </Link>

          <button className="hero-cta-secondary">
            <span className="hero-cta-play-icon">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
                <path d="M0 0.5L9 5L0 9.5V0.5Z"/>
              </svg>
            </span>
            See how it works
          </button>
        </div>

        {/* Social Proof */}
        <div className="hero-social-proof">
          <div className="hero-avatars">
            {["A", "S", "R", "M"].map((letter, i) => (
              <div key={i} className="avatar-ring">{letter}</div>
            ))}
          </div>
          <div className="hero-social-proof-text">
            <span className="proof-count">2,400+ collectors</span>
            <span className="proof-label">already building their vault</span>
          </div>

          <div className="hero-social-divider" />

          <div className="hero-stars">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ))}
            </div>
            <span className="stars-label">4.9 / 5 rating</span>
          </div>
        </div>

        {/* App Preview Frame */}
        <div className="hero-preview">
          <div className="hero-preview-glow" />
          <div className="hero-preview-frame">

            {/* Window Chrome */}
            <div className="preview-chrome">
              <div className="preview-chrome-dots">
                <span /><span /><span />
              </div>
              <div className="preview-chrome-bar">
                <span className="preview-chrome-lock">
                  <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                </span>
                <span className="preview-chrome-url">app.collectra.io/dashboard</span>
              </div>
            </div>

            {/* App Body */}
            <div className="preview-body">
              {/* Sidebar */}
              <div className="preview-sidebar">
                {PREVIEW_NAV.map((item, i) => (
                  <div key={i} className={`preview-sidebar-item ${item.active ? "preview-sidebar-item--active" : ""}`}>
                    <div className="preview-sidebar-dot" />
                    <div className={`preview-sidebar-label ${item.active ? "preview-sidebar-label--active" : ""}`} />
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="preview-main">
                <div className="preview-main-header">
                  <div className="preview-main-title" />
                  <div className="preview-main-search" />
                </div>
                <div className="preview-cards-grid">
                  {PREVIEW_CARDS.map((card) => (
                    <div key={card.id} className="preview-card">
                      <div className={`preview-card-img preview-card-img--${card.img}`} />
                      <div className="preview-card-body">
                        <div className="preview-card-line" />
                        <div className="preview-card-line preview-card-line--short" />
                        <div className="preview-card-line preview-card-line--accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="hero-stats-strip">
          <div className="hero-stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-desc">Items saved daily</span>
          </div>
          <div className="hero-stat-item">
            <span className="stat-number">12+</span>
            <span className="stat-desc">Content types supported</span>
          </div>
          <div className="hero-stat-item">
            <span className="stat-number">99.9%</span>
            <span className="stat-desc">Uptime guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;