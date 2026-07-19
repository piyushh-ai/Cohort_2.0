import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const { user } = useSelector((s) => s.auth);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.1 }
      );
      gsap.fromTo(
        logoRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.35 }
      );
      gsap.fromTo(
        linksRef.current ? linksRef.current.children : [],
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out", delay: 0.5 }
      );
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.5)", delay: 0.75 }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── Mobile menu toggle ── */
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.38, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "New Arrivals", to: "/#new" },
    { label: "Collections", to: "/#collections" },
    { label: "Streetwear", to: "/#streetwear" },
  ];

  const isActive = (to) => location.pathname === to || (to === "/" && location.pathname === "/");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .snitch-nav {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          /* Always a dark glass — looks great on hero from the start */
          background: rgba(10, 8, 20, 0.35);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        /* Scrolled: light frosted glass */
        .snitch-nav.scrolled {
          background: rgba(250, 248, 255, 0.92) !important;
          backdrop-filter: blur(28px) !important;
          -webkit-backdrop-filter: blur(28px) !important;
          border-bottom: 1px solid rgba(109, 40, 217, 0.1) !important;
          box-shadow: 0 2px 32px rgba(109, 40, 217, 0.06), 0 1px 0 rgba(109,40,217,0.05);
        }
        .snitch-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2.5rem);
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .snitch-logo {
          font-family: 'Bebas Neue', cursive;
          font-size: 2rem;
          letter-spacing: 0.22em;
          text-decoration: none;
          line-height: 1;
          user-select: none;
          /* Default: white on dark glass */
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          transition: opacity 0.3s;
        }
        .snitch-logo:hover { opacity: 0.82; }
        /* Scrolled: gradient */
        .snitch-nav.scrolled .snitch-logo {
          background: linear-gradient(135deg, #1a1b21 20%, #6d28d9 70%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 1;
        }
        .snitch-nav.scrolled .snitch-logo:hover { opacity: 0.82; }

        /* ── Nav Links ── */
        .snitch-nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .snitch-nav-link {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.22s;
        }
        .snitch-nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: rgba(255, 255, 255, 0.65);
          transition: width 0.26s ease;
          border-radius: 2px;
        }
        .snitch-nav-link:hover,
        .snitch-nav-link.active { color: #ffffff; }
        .snitch-nav-link:hover::after,
        .snitch-nav-link.active::after { width: 100%; }
        .snitch-nav-link.active { font-weight: 600; }
        /* Scrolled: dark links */
        .snitch-nav.scrolled .snitch-nav-link { color: #4a4455; }
        .snitch-nav.scrolled .snitch-nav-link::after { background: linear-gradient(90deg, #7c3aed, #db2777); }
        .snitch-nav.scrolled .snitch-nav-link:hover,
        .snitch-nav.scrolled .snitch-nav-link.active { color: #7c3aed; }

        /* ── CTA area ── */
        .snitch-nav-cta { display: flex; align-items: center; gap: 10px; }

        /* Sign In / outline button — white ghost on dark glass */
        .btn-outline-nav {
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 100px;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.06);
          cursor: pointer; text-decoration: none;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          white-space: nowrap;
        }
        .btn-outline-nav:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.65);
          color: #ffffff;
        }
        /* Scrolled: purple outline */
        .snitch-nav.scrolled .btn-outline-nav {
          border: 1.5px solid rgba(109,40,217,0.3);
          color: #7c3aed;
          background: transparent;
        }
        .snitch-nav.scrolled .btn-outline-nav:hover {
          background: rgba(109,40,217,0.06);
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(109,40,217,0.08);
          color: #7c3aed;
        }

        /* Join Free / filled gradient button — same in both states */
        .btn-filled-nav {
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 9px 22px;
          border-radius: 100px; border: none;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          cursor: pointer; text-decoration: none;
          transition: opacity 0.2s, box-shadow 0.2s, transform 0.18s;
          white-space: nowrap;
          position: relative; overflow: hidden;
        }
        .btn-filled-nav:hover {
          opacity: 0.92;
          box-shadow: 0 6px 24px rgba(124,58,237,0.4);
          transform: translateY(-1px);
        }
        .btn-filled-nav::after {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-18deg);
          transition: left 0.5s ease;
        }
        .btn-filled-nav:hover::after { left: 180%; }

        /* User chip */
        .nav-user-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 8px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.1);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          font-size: 12px; font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          cursor: default;
          transition: background 0.35s, border-color 0.35s, color 0.35s;
        }
        .snitch-nav.scrolled .nav-user-chip {
          background: rgba(109,40,217,0.07);
          border: 1.5px solid rgba(109,40,217,0.15);
          color: #7c3aed;
        }
        .nav-user-avatar {
          width: 26px; height: 26px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 11px; font-weight: 700; flex-shrink: 0;
        }

        /* ── Hamburger ── */
        .nav-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px;
          border-radius: 8px; background: none; border: none;
          transition: background 0.2s;
        }
        .nav-hamburger:hover { background: rgba(255,255,255,0.1); }
        .nav-hamburger span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.85);
          border-radius: 2px;
          transition: transform 0.28s ease, opacity 0.22s ease, background 0.22s;
        }
        .snitch-nav.scrolled .nav-hamburger:hover { background: rgba(109,40,217,0.06); }
        .snitch-nav.scrolled .nav-hamburger span { background: #4a4455; }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #a78bfa; }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #a78bfa; }

        /* ── Mobile menu ── */
        .nav-mobile-menu {
          overflow: hidden; height: 0; opacity: 0;
          background: rgba(250,248,255,0.97);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(109,40,217,0.09);
        }
        .nav-mobile-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 1rem clamp(1rem,4vw,2.5rem) 1.5rem;
          display: flex; flex-direction: column; gap: 4px;
        }
        .nav-mobile-link {
          font-size: 15px; font-weight: 500; color: #4a4455;
          padding: 10px 0;
          border-bottom: 1px solid rgba(109,40,217,0.06);
          text-decoration: none; display: block;
          transition: color 0.2s, padding-left 0.22s;
        }
        .nav-mobile-link:hover { color: #7c3aed; padding-left: 6px; }
        .nav-mobile-link:last-child { border-bottom: none; }
        .nav-mobile-actions { display: flex; gap: 10px; margin-top: 12px; }
        .nav-mobile-actions a,
        .nav-mobile-actions button {
          flex: 1; text-align: center; padding: 11px 0;
          border-radius: 100px; font-size: 13px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          cursor: pointer; border: none;
        }

        @media (max-width: 860px) {
          .snitch-nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .snitch-desktop-cta { display: none !important; }
        }
        @media (min-width: 861px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`snitch-nav${scrolled ? " scrolled" : ""}`}
        style={{ opacity: 0 }}
      >
        <div className="snitch-nav-inner">
          {/* Logo */}
          <Link ref={logoRef} to="/" className="snitch-logo" style={{ opacity: 0 }}>
            SNITCH
          </Link>

          {/* Desktop links */}
          <ul ref={linksRef} className="snitch-nav-links">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={`snitch-nav-link${isActive(l.to) ? " active" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div ref={ctaRef} className="snitch-nav-cta snitch-desktop-cta" style={{ opacity: 0 }}>
            {user ? (
              <>
                <div className="nav-user-chip">
                  <div className="nav-user-avatar">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span>{user.name || user.email?.split("@")[0] || "User"}</span>
                </div>
                {user.role === "seller" && (
                  <Link to="/seller/dashboard" className="btn-outline-nav">
                    Dashboard
                  </Link>
                )}
                <button className="btn-filled-nav" onClick={handleLogoutClick}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline-nav">Sign In</Link>
                <Link to="/register" className="btn-filled-nav">Join Free</Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu */}
        <div ref={mobileMenuRef} className="nav-mobile-menu">
          <div className="nav-mobile-inner">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="nav-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="nav-mobile-actions">
              {user ? (
                <>
                  {user.role === "seller" && (
                    <Link
                      to="/seller/dashboard"
                      onClick={() => setMenuOpen(false)}
                      style={{ background: "rgba(109,40,217,0.08)", color: "#7c3aed", textDecoration: "none", display: "block", flex: 1, textAlign: "center", padding: "11px 0", borderRadius: "100px", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogoutClick}
                    style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "#fff" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    style={{ background: "rgba(109,40,217,0.07)", color: "#7c3aed", border: "1.5px solid rgba(109,40,217,0.2)", textDecoration: "none", display: "block", flex: 1, textAlign: "center", padding: "11px 0", borderRadius: "100px", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "#fff", textDecoration: "none", display: "block", flex: 1, textAlign: "center", padding: "11px 0", borderRadius: "100px", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    Join Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
