import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useProduct } from "../hooks/useProduct";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    imageUrl: "",
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  // ─── Refs ───────────────────────────────────────────
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const bgImageRef = useRef(null);
  const formCardRef = useRef(null);
  const headerRef = useRef(null);
  const fieldRefs = useRef([]);
  const ctaRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const previewRef = useRef(null);

  // ─── Default Image ──────────────────────────────────
  const defaultImage =
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop";
  const displayImage = formData.imageUrl || defaultImage;

  // ─── Preload Image ──────────────────────────────────
  useEffect(() => {
    const img = new Image();
    img.src = displayImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, [displayImage]);

  // ─── Animations ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel reveal
      gsap.fromTo(
        leftPanelRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power4.out" }
      );

      // Background image fade
      gsap.to(bgImageRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Form animation
      tl.fromTo(
        formCardRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        0.2
      )
        .fromTo(
          headerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.4
        )
        .fromTo(
          previewRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6 },
          0.5
        )
        .fromTo(
          fieldRefs.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          0.6
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.9
        );

      // Ambient orbs
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 20,
        duration: 6.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 25,
        x: -20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ─── Handlers ───────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFieldEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.015,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const onFieldLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    gsap.timeline()
      .to(ctaRef.current, { scale: 0.96, duration: 0.1 })
      .to(ctaRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });

    const payload = {
      title: formData.title,
      description: formData.description,
      price: {
        amout: Number(formData.amount), // using amout as per JSON schema
        currency: "INR",
      },
      images: [
        {
          url: formData.imageUrl,
        },
      ],
    };

    await handleCreateProduct(payload);
    setIsSubmitting(false);
    navigate("/seller"); // Redirect to seller dashboard or appropriate page
  };

  const setFieldRef = (el, index) => {
    if (el && !fieldRefs.current.includes(el)) {
      fieldRefs.current[index] = el;
    }
  };

  // ─── JSX ───────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:ital@1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cp-bebas { font-family: 'Bebas Neue', cursive; }
        .cp-playfair { font-family: 'Playfair Display', serif; }
        .cp-dm { font-family: 'DM Sans', sans-serif; }

        /* Left panel grain */
        .cp-grain::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none; z-index: 2;
        }

        /* Right panel grid */
        .cp-dotgrid {
          background-image: radial-gradient(circle, rgba(109,40,217,0.07) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Input fields */
        .cp-field { position: relative; }
        .cp-field:focus-within {
          border-color: rgba(109,40,217,0.5) !important;
          box-shadow: 0 0 0 3px rgba(109,40,217,0.08), 0 2px 20px rgba(109,40,217,0.06) !important;
        }
        .cp-field:focus-within .cp-ficon { color: #7c3aed !important; }

        .cp-input {
          padding: 24px 16px 8px 44px;
          background: transparent;
          width: 100%;
          color: #1a1b21;
          outline: none;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          border: none;
        }
        .cp-textarea {
          resize: none;
          min-height: 90px;
          padding-top: 26px;
        }
        .cp-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #f4f3fb inset;
          -webkit-text-fill-color: #1a1b21;
        }

        /* Floating label */
        .cp-label {
          position: absolute; left: 44px; top: 22px;
          color: #9ca3af; font-size: 14px;
          pointer-events: none; transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .cp-textarea ~ .cp-label { top: 20px; }
        .cp-input:focus ~ .cp-label,
        .cp-input:not(:placeholder-shown) ~ .cp-label {
          top: 8px; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #7c3aed; font-weight: 600;
        }

        /* CTA */
        .cp-cta {
          background: linear-gradient(135deg, #7c3aed 0%, #db2777 55%, #f59e0b 100%);
          background-size: 200% 200%;
          transition: background-position 0.5s ease, box-shadow 0.3s ease;
          position: relative; overflow: hidden;
        }
        .cp-cta:hover {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(124,58,237,0.35);
        }
        .cp-cta::after {
          content: ''; position: absolute;
          top: 0; left: -120%; width: 65%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-18deg); transition: left 0.55s ease;
        }
        .cp-cta:hover::after { left: 170%; }

        /* Orbs */
        .cp-orb1 {
          position: absolute; width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,40,217,0.08) 0%, rgba(219,39,119,0.04) 45%, transparent 70%);
          top: -100px; right: -120px;
          pointer-events: none; filter: blur(2px); z-index: 0;
        }
        .cp-orb2 {
          position: absolute; width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, rgba(16,185,129,0.04) 45%, transparent 70%);
          bottom: -50px; left: -80px;
          pointer-events: none; z-index: 0;
        }

        /* Corner decoration */
        .cp-corner {
          position: absolute; bottom: 0; right: 0;
          width: 160px; height: 160px;
          border-top: 1px solid rgba(109,40,217,0.15);
          border-left: 1px solid rgba(109,40,217,0.15);
          border-radius: 100% 0 0 0;
          pointer-events: none; z-index: 3;
        }

        /* Gradient Text */
        .cp-grad-text {
          background: linear-gradient(135deg, #1a1b21 20%, #6d28d9 70%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .cp-preview-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }
      `}</style>

      <div
        ref={containerRef}
        className="cp-dm"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          background: "#faf8ff",
          overflow: "hidden",
        }}
      >
        {/* ═══════════════════════════════════════
            LEFT PANEL – Real-time Product Preview
        ═══════════════════════════════════════ */}
        <div
          ref={leftPanelRef}
          style={{
            width: "45%",
            minHeight: "100vh",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* Dynamic Background Image */}
          <div
            ref={bgImageRef}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${displayImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.65) brightness(0.85)",
              opacity: 0, // faded in by GSAP
              transition: "background-image 0.5s ease-in-out"
            }}
          />
          {/* Subtle vignette/gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg, rgba(109,40,217,0.1) 0%, rgba(250,248,255,0.05) 50%, rgba(26,27,33,0.85) 100%)",
            }}
          />
          <div className="cp-corner" />
          <div
            className="cp-grain"
            style={{ position: "absolute", inset: 0, zIndex: 2 }}
          />

          {/* Content overlay */}
          <div
            style={{
              position: "relative",
              zIndex: 4,
              padding: "clamp(2.5rem, 5vw, 4rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
          >
            {/* Top Brand Logo */}
            <div>
              <h1
                className="cp-bebas"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "0.2em",
                  color: "#fff",
                  lineHeight: 1,
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                SNITCH
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 8,
                    fontWeight: 500,
                  }}
                >
                  Seller Studio
                </span>
              </h1>
            </div>

            {/* Bottom Preview Info */}
            <div ref={previewRef}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(12px)",
                  display: "inline-block",
                  marginBottom: 16,
                }}
              >
                Live Preview
              </span>
              <h2
                className="cp-playfair"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#fff",
                  lineHeight: 1.1,
                  fontStyle: "italic",
                  marginBottom: 12,
                  textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                }}
              >
                {formData.title || "Untitled Masterpiece"}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  maxWidth: "90%",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {formData.description ||
                  "Craft your product description here. Make it compelling, sharp, and true to the culture."}
              </p>
              
              <div style={{ marginTop: 24, display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ color: "#10b981", fontSize: 24, fontWeight: 700 }}>
                  ₹{formData.amount || "0.00"}
                </span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textTransform: "uppercase" }}>
                  INR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT PANEL – Product Creation Form
        ═══════════════════════════════════════ */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden",
            background: "#faf8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(2rem,4vw,3rem) 2rem",
          }}
        >
          {/* Dot grid */}
          <div
            className="cp-dotgrid"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Ambient orbs */}
          <div ref={orb1Ref} className="cp-orb1" />
          <div ref={orb2Ref} className="cp-orb2" />

          {/* Decorative Ring */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "-5%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "1px dashed rgba(109,40,217,0.15)",
              animation: "spin 30s linear infinite",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Form Card */}
          <div
            ref={formCardRef}
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: 520,
              margin: "auto",
              padding: "clamp(1.8rem, 4vw, 2.8rem)",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: 20,
              border: "1px solid rgba(109,40,217,0.12)",
              boxShadow:
                "0 12px 48px rgba(109,40,217,0.08), 0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header */}
            <div ref={headerRef} style={{ marginBottom: 30 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg,rgba(109,40,217,0.12),rgba(219,39,119,0.08))",
                  border: "1px solid rgba(109,40,217,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.8"
                >
                  <path d="M20 16V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12" />
                  <rect x="2" y="16" width="20" height="6" rx="2" />
                  <path d="M12 11V7" />
                  <path d="M10 9h4" />
                </svg>
              </div>
              <h2
                className="cp-grad-text"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                Create Product
              </h2>
              <p style={{ fontSize: 13.5, color: "#9ca3af", lineHeight: 1.5 }}>
                Drop a new piece into the Snitch catalog. Define the style,
                set the price, build the hype.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* Product Title */}
              <div
                ref={(el) => setFieldRef(el, 0)}
                className="cp-field"
                style={{
                  background: "#f4f3fb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={onFieldEnter}
                onMouseLeave={onFieldLeave}
              >
                <div
                  className="cp-ficon"
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d1d5db",
                    transition: "color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                </div>
                <input
                  id="prod-title"
                  name="title"
                  type="text"
                  required
                  placeholder=" "
                  className="cp-input"
                  value={formData.title}
                  onChange={handleChange}
                />
                <label className="cp-label" htmlFor="prod-title">
                  Product Title
                </label>
              </div>

              {/* Price */}
              <div
                ref={(el) => setFieldRef(el, 1)}
                className="cp-field"
                style={{
                  background: "#f4f3fb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={onFieldEnter}
                onMouseLeave={onFieldLeave}
              >
                <div
                  className="cp-ficon"
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d1d5db",
                    transition: "color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <input
                  id="prod-price"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder=" "
                  className="cp-input"
                  value={formData.amount}
                  onChange={handleChange}
                />
                <label className="cp-label" htmlFor="prod-price">
                  Amount (INR)
                </label>
              </div>

              {/* Image URL */}
              <div
                ref={(el) => setFieldRef(el, 2)}
                className="cp-field"
                style={{
                  background: "#f4f3fb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={onFieldEnter}
                onMouseLeave={onFieldLeave}
              >
                <div
                  className="cp-ficon"
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d1d5db",
                    transition: "color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <input
                  id="prod-image"
                  name="imageUrl"
                  type="url"
                  required
                  placeholder=" "
                  className="cp-input"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
                <label className="cp-label" htmlFor="prod-image">
                  Primary Image URL
                </label>
              </div>

              {/* Description */}
              <div
                ref={(el) => setFieldRef(el, 3)}
                className="cp-field"
                style={{
                  background: "#f4f3fb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={onFieldEnter}
                onMouseLeave={onFieldLeave}
              >
                <div
                  className="cp-ficon"
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 24,
                    color: "#d1d5db",
                    transition: "color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="21" y1="10" x2="3" y2="10"/>
                    <line x1="21" y1="6" x2="3" y2="6"/>
                    <line x1="21" y1="14" x2="3" y2="14"/>
                    <line x1="14" y1="18" x2="3" y2="18"/>
                  </svg>
                </div>
                <textarea
                  id="prod-desc"
                  name="description"
                  required
                  placeholder=" "
                  className="cp-input cp-textarea"
                  value={formData.description}
                  onChange={handleChange}
                />
                <label className="cp-label" htmlFor="prod-desc">
                  Product Description
                </label>
              </div>

              {/* Submit CTA */}
              <button
                ref={ctaRef}
                type="submit"
                disabled={isSubmitting}
                className="cp-cta"
                style={{
                  width: "100%",
                  padding: "16px 0",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  borderRadius: 12,
                  marginTop: 16,
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: isSubmitting ? 0.8 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin"
                      style={{ animation: "spin 1s linear infinite" }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)"/>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    CREATING...
                  </>
                ) : (
                  <>
                    PUBLISH PRODUCT
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default CreateProduct;
