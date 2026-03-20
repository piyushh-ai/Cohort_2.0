import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WelcomeNavbar.scss";

const NAV_LINKS = [
  { label: "Features", section: "features" },
  { label: "How it works", section: "how-it-works" },
  { label: "Builder", section: "builder" },
];

const WelcomeNavbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Apply glass background after scrolling 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer when screen grows beyond mobile breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300); // wait for drawer to close
  };

  return (
    <>
      <nav className={`welcome-navbar ${scrolled ? "scrolled" : ""}`}>

        {/* ── Brand ── */}
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <div className="navbar-logo-mark">
            <div className="navbar-logo-inner">CL</div>
          </div>
          <span className="navbar-brand-name">Collectra</span>
        </Link>

        {/* ── Desktop Center Links ── */}
        <div className="navbar-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link.section}
              className="navbar-link"
              onClick={() => scrollTo(link.section)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Desktop CTA ── */}
        <div className="navbar-cta">
          <Link to="/login">
            <button className="navbar-signin-btn">Sign in</button>
          </Link>
          <Link to="/register">
            <button className="navbar-getstarted-btn">Get started free</button>
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`navbar-drawer ${menuOpen ? "open" : ""}`}>
        <div className="navbar-drawer-inner">

          {/* Nav Links */}
          {NAV_LINKS.map((link) => (
            <button
              key={link.section}
              className="drawer-link"
              onClick={() => scrollTo(link.section)}
            >
              {link.label}
              <span className="drawer-link-arrow">→</span>
            </button>
          ))}

          <div className="drawer-divider" />

          {/* CTA Buttons */}
          <div className="drawer-cta">
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="drawer-signin-btn">Sign in</button>
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <button className="drawer-getstarted-btn">
                Get started free — it's free
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default WelcomeNavbar;