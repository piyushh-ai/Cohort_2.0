import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const cols = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", to: "/#new" },
        { label: "Streetwear", to: "/#streetwear" },
        { label: "Collections", to: "/#collections" },
        { label: "Accessories", to: "/#accessories" },
        { label: "Sale", to: "/#sale" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Snitch", to: "/about" },
        { label: "Careers", to: "/careers" },
        { label: "Press", to: "/press" },
        { label: "Sustainability", to: "/sustainability" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", to: "/help" },
        { label: "Returns", to: "/returns" },
        { label: "Shipping Info", to: "/shipping" },
        { label: "Size Guide", to: "/size-guide" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Sellers",
      links: [
        { label: "Sell on Snitch", to: "/register" },
        { label: "Seller Dashboard", to: "/seller/dashboard" },
        { label: "Create Listing", to: "/seller/create-product" },
        { label: "Seller Policy", to: "/seller-policy" },
      ],
    },
  ];

  const socials = [
    {
      label: "Instagram",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        .snitch-footer {
          font-family: 'DM Sans', sans-serif;
          background: #0f0d16;
          color: #a09ab8;
          padding-top: 4rem;
          border-top: 1px solid rgba(109,40,217,0.15);
          position: relative;
          overflow: hidden;
        }
        .snitch-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(219,39,119,0.4), transparent);
        }
        .footer-glow {
          position: absolute;
          top: -160px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 300px;
          background: radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2.5rem) 3rem;
          position: relative;
          z-index: 1;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.6fr repeat(4, 1fr);
          gap: 2.5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .footer-brand h2 {
          font-family: 'Bebas Neue', cursive;
          font-size: 2.8rem;
          letter-spacing: 0.2em;
          background: linear-gradient(135deg, #fff 20%, #a78bfa 60%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 4px;
        }
        .footer-brand .tagline {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(124,58,237,0.65);
          font-weight: 600;
          margin-bottom: 16px;
          display: block;
        }
        .footer-brand p {
          font-size: 13px;
          line-height: 1.7;
          color: #6e6882;
          max-width: 240px;
          margin-bottom: 20px;
        }
        .footer-socials {
          display: flex;
          gap: 8px;
        }
        .social-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #6e6882;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.18s;
        }
        .social-btn:hover {
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.3);
          color: #a78bfa;
          transform: translateY(-2px);
        }
        .footer-col h4 {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 16px;
        }
        .footer-col ul {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-col a {
          font-size: 13px;
          color: #6e6882;
          text-decoration: none;
          transition: color 0.2s, padding-left 0.22s;
          display: block;
        }
        .footer-col a:hover { color: #a78bfa; padding-left: 4px; }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0 0;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer-bottom p {
          font-size: 12px;
          color: #3d3650;
        }
        .footer-bottom span { color: #6d28d9; }
        .footer-legal {
          display: flex;
          gap: 1.25rem;
        }
        .footer-legal a {
          font-size: 11px;
          color: #3d3650;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.04em;
        }
        .footer-legal a:hover { color: #6e6882; }

        .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(109,40,217,0.08);
          border: 1px solid rgba(109,40,217,0.18);
          font-size: 11px;
          font-weight: 600;
          color: #a78bfa;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        .footer-pulse {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: fpulse 2s ease-out infinite;
          flex-shrink: 0;
        }
        @keyframes fpulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }

        @media (max-width: 1000px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .footer-top { grid-template-columns: 1fr 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer ref={footerRef} className="snitch-footer" style={{ opacity: 0 }}>
        <div className="footer-glow" />
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-badge">
                <span className="footer-pulse" />
                2.4M+ Members Worldwide
              </div>
              <h2>SNITCH</h2>
              <span className="tagline">Premium Streetwear</span>
              <p>
                The culture's favourite clothing destination. Drop-exclusive streetwear for the bold, the expressive, and the unapologetic.
              </p>
              <div className="footer-socials">
                {socials.map((s) => (
                  <a key={s.label} href="#" className="social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {cols.map((col) => (
              <div key={col.title} className="footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Snitch. Crafted with{" "}
              <span>♥</span> for the culture.
            </p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Settings</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
