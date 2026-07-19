import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

/* ─── Marquee items ─────────────────────────────────────────── */
const TICKER = [
  "NEW DROP",
  "FREE SHIPPING ₹999+",
  "STREETWEAR CULTURE",
  "LIMITED EDITION",
  "SNITCH ORIGINALS",
  "EXCLUSIVE DROPS",
  "EST. 2020",
  "WEAR THE ATTITUDE",
];

/* ─── Category data ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: "Oversized Tees",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    tag: "150+ styles",
  },
  {
    label: "Hoodies",
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?q=80&w=600&auto=format&fit=crop",
    tag: "80+ styles",
  },
  {
    label: "Joggers",
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=600&auto=format&fit=crop",
    tag: "60+ styles",
  },
  {
    label: "Accessories",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
    tag: "40+ styles",
  },
];

/* ─── Hero images (split panel) ────────────────────────────── */
const HERO_LEFT =
  "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=960&auto=format&fit=crop";
const HERO_RIGHT =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=960&auto=format&fit=crop";

export default function Home() {
  const { handleGetAllProducts } = useProduct();
  const { allProducts } = useSelector((s) => s.product);
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [heroReady, setHeroReady] = useState(false);

  /* refs */
  const wrapRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCTARef = useRef(null);
  const tickerRef = useRef(null);
  const catsRef = useRef(null);
  const productsRef = useRef(null);

  /* fetch */
  useEffect(() => {
    handleGetAllProducts();
  }, [isAuthenticated]);

  /* preload hero */
  useEffect(() => {
    let loaded = 0;
    const check = () => {
      if (++loaded === 2) setHeroReady(true);
    };
    [HERO_LEFT, HERO_RIGHT].forEach((src) => {
      const i = new Image();
      i.src = src;
      i.onload = check;
      i.onerror = check;
    });
  }, []);

  /* GSAP animations */
  useEffect(() => {
    if (!heroReady) return;
    const ctx = gsap.context(() => {
      /* hero panels slide in */
      gsap.fromTo(
        leftPanelRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut" },
      );
      gsap.fromTo(
        rightPanelRef.current,
        { clipPath: "inset(0 0 0 100%)" },
        { clipPath: "inset(0 0 0 0%)", duration: 1.2, ease: "power4.inOut" },
      );
      /* text */
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 60, skewY: 4 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        },
      );
      gsap.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.8 },
      );
      gsap.fromTo(
        heroCTARef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.1 },
      );

      /* categories */
      if (catsRef.current) {
        gsap.fromTo(
          ".cat-card",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: catsRef.current, start: "top 82%" },
          },
        );
      }

      /* products */
      if (productsRef.current) {
        gsap.fromTo(
          ".product-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: productsRef.current, start: "top 80%" },
          },
        );
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [heroReady, allProducts]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home-root {
          background: #faf8ff;
          min-height: 80vh;
          font-family: 'DM Sans', sans-serif;
          color: #1a1b21;
          overflow: hidden;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 620px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
        }
        @media(max-width:700px){ .hero { grid-template-columns: 1fr; } }

        .hero-panel {
          position: relative;
          overflow: hidden;

        }
        .hero-panel img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: brightness(0.55) saturate(1.1);
          transition: filter 0.6s;

        }
        .hero-panel:hover img { filter: brightness(0.65) saturate(1.2); }

        /* divider line */
        .hero::after {
          content: '';
          position: absolute;
          left: 50%; top: 0;
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent);
          z-index: 5;
        }
        @media(max-width:700px){ .hero::after { display:none; } }

        .hero-overlay {
          position: absolute;
          inset: 0;
          /* Dark vignette at top (navbar sits here) → clears in mid → soft lift at bottom for text */
          background:
            linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 30%),
            linear-gradient(to top, rgba(10,8,20,0.72) 0%, rgba(10,8,20,0.0) 55%);
          z-index: 2;
        }

        .hero-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 10;
          padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px; height: 1px;
          background: rgba(255,255,255,0.35);
        }

        .hero-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(5rem, 14vw, 11rem);
          line-height: 0.9;
          letter-spacing: 0.04em;
          color: #ffffff;
          will-change: transform, opacity;
          text-shadow: 0 4px 32px rgba(0,0,0,0.35);
        }
        .hero-title .accent {
          background: linear-gradient(120deg, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.65);
          font-weight: 400;
          max-width: 480px;
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .btn-primary {
          padding: 14px 34px;
          border-radius: 4px;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #9f67ff, #f472b6);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(124,58,237,0.4); }
        .btn-primary:hover::after { opacity: 1; }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-ghost {
          padding: 13px 30px;
          border-radius: 4px;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .btn-ghost:hover {
          border-color: rgba(167,139,250,0.6);
          color: #ffffff;
          background: rgba(255,255,255,0.14);
        }

        /* ── TICKER ── */
        .ticker-wrap {
          background: linear-gradient(135deg, #7c3aed, #db2777);
          overflow: hidden;
          padding: 13px 0;
          position: relative;
          z-index: 20;
        }
        .ticker-track {
          display: flex;
          gap: 0;
          width: max-content;
          animation: ticker-scroll 28s linear infinite;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 24px;
          padding: 0 24px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          white-space: nowrap;
        }
        .ticker-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          flex-shrink: 0;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── SECTION HEADER ── */
        .sec-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .sec-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 14px;
        }
        .sec-tag::before, .sec-tag::after {
          content: '';
          display: inline-block;
          width: 22px; height: 1px;
          background: #7c3aed;
        }
        .sec-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          letter-spacing: 0.08em;
          line-height: 1;
          color: #1a1b21;
        }
        .sec-line {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #7c3aed, #db2777);
          margin: 1rem auto 0;
          border-radius: 2px;
        }

        /* ── CATEGORIES ── */
        .cats-section {
          padding: 6rem clamp(1rem, 5vw, 4rem);
          max-width: 1320px;
          margin: 0 auto;
        }
        .cats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media(max-width:900px){ .cats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:500px){ .cats-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; } }

        .cat-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 3/4;
          cursor: pointer;
          will-change: transform;
          transition: transform 0.35s ease;
        }
        .cat-card:hover { transform: scale(1.02); }
        .cat-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
          filter: brightness(0.5) saturate(0.9);
        }
        .cat-card:hover img { transform: scale(1.08); filter: brightness(0.6) saturate(1.1); }

        .cat-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.4rem 1.2rem;
          background: linear-gradient(to top, rgba(13,13,15,0.9) 0%, transparent 100%);
        }
        .cat-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 4px;
        }
        .cat-label {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.6rem;
          letter-spacing: 0.06em;
          color: #fff;
          line-height: 1;
        }
        .cat-arrow {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
          transform: translateY(4px);
        }
        .cat-card:hover .cat-arrow { opacity: 1; transform: translateY(0); }

        /* ── PRODUCTS ── */
        .products-section {
          padding: 2rem clamp(1rem, 5vw, 4rem) 6rem;
          max-width: 1320px;
          margin: 0 auto;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
          gap: 1.5rem;
        }

        /* ── EMPTY STATE ── */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 2rem;
        }
        .empty-icon {
          font-size: 3.5rem;
          margin-bottom: 1.2rem;
          opacity: 0.5;
        }
        .empty-text {
          font-size: 1rem;
          color: rgba(26,27,33,0.4);
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        /* ── BANNER ── */
        .banner {
          margin: 0 clamp(1rem, 5vw, 4rem);
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          height: 340px;
          display: flex;
          align-items: center;
          padding: 0 clamp(2rem, 6vw, 5rem);
          background: linear-gradient(135deg, #f0ebff 0%, #fdf0f8 50%, #ede9fe 100%);
          border: 1px solid rgba(124,58,237,0.1);
        }
        .banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(167,139,250,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 50%, rgba(244,114,182,0.1) 0%, transparent 70%);
        }
        .banner-img {
          position: absolute;
          right: 0; top: 0;
          height: 100%; width: 45%;
          object-fit: cover;
          object-position: center top;
          opacity: 0.18;
          mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 100%);
        }
        .banner-content { position: relative; z-index: 2; }
        .banner-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #db2777;
          margin-bottom: 12px;
        }
        .banner-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(2.5rem, 5vw, 4rem);
          letter-spacing: 0.08em;
          color: #1a1b21;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .banner-title .grd {
          background: linear-gradient(120deg, #7c3aed, #db2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .banner-sub {
          font-size: 0.9rem;
          color: rgba(26,27,33,0.5);
          max-width: 380px;
          line-height: 1.6;
          margin-bottom: 1.6rem;
        }

        /* ── SCROLL BAR ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #faf8ff; }
        ::-webkit-scrollbar-thumb { background: #d8d3f0; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #b8aee8; }
      `}</style>

      <div className="home-root" ref={wrapRef}>
        <Navbar />

        {/* ─── HERO ─────────────────────────────── */}
        <section className="hero">
          {/* Left panel */}
          <div className="hero-panel" ref={leftPanelRef}>
            <img src={HERO_LEFT} alt="Snitch drop left" />
            <div className="hero-overlay" />
          </div>

          {/* Right panel */}
          <div className="hero-panel" ref={rightPanelRef}>
            <img src={HERO_RIGHT} alt="Snitch drop right" />
            <div className="hero-overlay" />
          </div>

          {/* Text overlay (absolute, bottom) */}
          <div className="hero-content">
            <p
              className="hero-eyebrow"
              ref={heroTextRef}
              style={{ opacity: 0 }}
            >
              Summer Collection 2025
            </p>
            <h1 className="hero-title" ref={heroTextRef} style={{ opacity: 0 }}>
              WEAR THE
              <br />
              <span className="accent">ATTITUDE</span>
            </h1>
            <p className="hero-sub" ref={heroSubRef} style={{ opacity: 0 }}>
              Drop-worthy streetwear that speaks before you do. Limited runs,
              unlimited flex.
            </p>
            <div
              className="hero-actions"
              ref={heroCTARef}
              style={{ opacity: 0 }}
            >
              <button className="btn-primary">
                <span>Shop Now</span>
              </button>
              <button className="btn-ghost">Explore Drops</button>
            </div>
          </div>
        </section>

        {/* ─── TICKER ─────────────────────────────── */}
        <div className="ticker-wrap">
          <div className="ticker-track" ref={tickerRef}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div className="ticker-item" key={i}>
                <span className="ticker-dot" />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* ─── CATEGORIES ─────────────────────────── */}
        <section className="cats-section" ref={catsRef}>
          <div className="sec-header">
            <p className="sec-tag">Browse by Style</p>
            <h2 className="sec-title">SHOP THE LOOK</h2>
            <div className="sec-line" />
          </div>

          <div className="cats-grid">
            {CATEGORIES.map((c) => (
              <div className="cat-card" key={c.label}>
                <img src={c.img} alt={c.label} />
                <div className="cat-body">
                  <p className="cat-tag">{c.tag}</p>
                  <p className="cat-label">{c.label}</p>
                </div>
                <div className="cat-arrow">↗</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROMO BANNER ────────────────────────── */}
        <div className="banner">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
            alt="promo"
            className="banner-img"
          />
          <div className="banner-content">
            <p className="banner-tag">Limited Time Drop</p>
            <h2 className="banner-title">
              SNITCH
              <br />
              <span className="grd">ORIGINALS</span>
            </h2>
            <p className="banner-sub">
              Hand-picked exclusives that sell out in hours. Don't sleep on this
              one.
            </p>
            <button className="btn-primary">
              <span>Grab Before It's Gone</span>
            </button>
          </div>
        </div>

        {/* ─── PRODUCTS GRID ─────────────────────── */}
        <section className="products-section" ref={productsRef}>
          <div className="sec-header" style={{ marginTop: "4rem" }}>
            <p className="sec-tag">Fresh From the Drop</p>
            <h2 className="sec-title">LATEST DROPS</h2>
            <div className="sec-line" />
          </div>

          <div className="products-grid">
            {allProducts && allProducts.length > 0 ? (
              allProducts.map((product, i) => (
                <div key={product._id} className="product-card">
                  <ProductCard product={product} index={i} />
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">👕</div>
                <p className="empty-text">No drops yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
