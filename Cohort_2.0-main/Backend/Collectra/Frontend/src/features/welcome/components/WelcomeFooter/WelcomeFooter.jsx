 
import { Link } from "react-router-dom";
import "./WelcomeFooter.scss";

const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "GitHub", href: "https://github.com" },
];

const WelcomeFooter = () => {
  return (
    <footer className="welcome-footer">
      {/* Final CTA Block */}
      <div className="footer-cta-block">
        <p className="footer-cta-eyebrow">Start for free</p>

        <h2 className="footer-cta-heading">
          <span className="cta-line-1">Your knowledge.</span>
          <span className="cta-line-2">Finally organized.</span>
        </h2>

        <p className="footer-cta-subtext">
          Join thousands of curious people who stopped losing great content and
          started building a vault worth keeping.
        </p>

        <div className="footer-cta-actions">
          <Link to="/register">
            <button className="footer-cta-primary-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
              </svg>
              Create your vault — it's free
            </button>
          </Link>
          <p className="footer-cta-free-note">
            <span>✓</span> No credit card &nbsp;·&nbsp; <span>✓</span> No expiry
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        {/* Brand */}
        <Link to="/" className="footer-brand">
          <div className="footer-logo-mark">CL</div>
          <span className="footer-brand-name">Collectra</span>
        </Link>

        {/* Nav Links */}
        <nav className="footer-nav">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="footer-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="footer-copy">
          © 2026 Collectra. Made with <span>♥</span>
        </p>
      </div>
    </footer>
  );
};

export default WelcomeFooter;