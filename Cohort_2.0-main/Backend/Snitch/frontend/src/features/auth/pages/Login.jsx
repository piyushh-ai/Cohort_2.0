import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const logoBarRef = useRef(null);
  const logoTagRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const quoteRef = useRef(null);
  const proofRef = useRef(null);
  const formCardRef = useRef(null);
  const formTitleRef = useRef(null);
  const formSubRef = useRef(null);
  const field1Ref = useRef(null);
  const field2Ref = useRef(null);
  const forgotRef = useRef(null);
  const ctaRef = useRef(null);
  const dividerRef = useRef(null);
  const gBtnRef = useRef(null);
  const signUpRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const rightRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const leftPanelRef = useRef(null);
  const bgImageRef = useRef(null);

  // Preload the background image so it's ready before animation fires
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;

    // Fade in the bg image div now that image is loaded
    const ctx = gsap.context(() => {
      gsap.to(bgImageRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.fromTo(
        leftPanelRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
      );

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -28 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" },
        0.2,
      )
        .fromTo(
          logoBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.inOut",
            transformOrigin: "left center",
          },
          0.45,
        )
        .fromTo(
          logoTagRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.65,
        )
        .fromTo(
          [badge1Ref.current, badge2Ref.current, badge3Ref.current],
          { opacity: 0, y: 10, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.45,
            ease: "back.out(1.5)",
          },
          0.75,
        )
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
          0.95,
        )
        .fromTo(
          proofRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55 },
          1.25,
        )
        .fromTo(
          formCardRef.current,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          0.15,
        )
        .fromTo(
          formTitleRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.4,
        )
        .fromTo(
          formSubRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0.52,
        )
        .fromTo(
          [field1Ref.current, field2Ref.current],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.45 },
          0.62,
        )
        .fromTo(
          forgotRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
          0.88,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45 },
          0.97,
        )
        .fromTo(
          dividerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
          1.1,
        )
        .fromTo(
          gBtnRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          1.2,
        )
        .fromTo(
          signUpRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
          1.32,
        );

      gsap.to(orb1Ref.current, {
        y: -30,
        x: 18,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 24,
        x: -16,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [imageLoaded]);

  // FIX: Cursor glow — use pointer position relative to rightRef
  // rightRef must NOT have overflow:hidden; glow is inside it with pointer-events:none
  const handleMouseMove = (e) => {
    const rect = rightRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(cursorGlowRef.current, {
      left: x,
      top: y,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () =>
    gsap.to(cursorGlowRef.current, { opacity: 0, duration: 0.3 });

  const onFieldEnter = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.013,
      duration: 0.22,
      ease: "power2.out",
    });
  const onFieldLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.22 });

  const handleCtaClick = async () => {
    gsap
      .timeline()
      .to(ctaRef.current, { scale: 0.96, duration: 0.09 })
      .to(ctaRef.current, {
        scale: 1,
        duration: 0.38,
        ease: "elastic.out(1,0.45)",
      });
    await handleLogin({ email: formData.email, password: formData.password });
    navigate("/");
  };

  const handleTogglePw = () => {
    setShowPassword((p) => !p);
    gsap.fromTo(
      "#login-pw-eye",
      { rotate: -18 },
      { rotate: 0, duration: 0.32, ease: "back.out(2)" },
    );
  };

  const badges = [
    {
      ref: badge1Ref,
      label: "Members Only",
      color: "#6d28d9",
      bg: "rgba(109,40,217,0.08)",
      border: "rgba(109,40,217,0.22)",
    },
    {
      ref: badge2Ref,
      label: "New Drops",
      color: "#db2777",
      bg: "rgba(219,39,119,0.08)",
      border: "rgba(219,39,119,0.22)",
    },
    {
      ref: badge3Ref,
      label: "Free Shipping",
      color: "#059669",
      bg: "rgba(5,150,105,0.08)",
      border: "rgba(5,150,105,0.22)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital@1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-bebas { font-family: 'Bebas Neue', cursive; }
        .lg-playfair { font-family: 'Playfair Display', serif; }
        .lg-dm { font-family: 'DM Sans', sans-serif; }

        .lg-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          pointer-events: none;
          z-index: 2;
        }

        .lg-dotgrid {
          background-image: radial-gradient(circle, rgba(109,40,217,0.07) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .lg-field { position: relative; }
        .lg-field:focus-within {
          border-color: rgba(109,40,217,0.5) !important;
          box-shadow: 0 0 0 3px rgba(109,40,217,0.08), 0 2px 20px rgba(109,40,217,0.06);
        }
        .lg-field:focus-within .lg-ficon { color: #7c3aed !important; }

        .lg-input {
          padding: 22px 14px 8px 44px;
          background: transparent;
          width: 100%;
          color: #1a1b21;
          outline: none;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          border: none;
        }
        .lg-input[type="password"] { padding-right: 44px; }
        .lg-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #f4f3fb inset;
          -webkit-text-fill-color: #1a1b21;
        }

        .lg-label {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 14px;
          pointer-events: none;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .lg-input:focus ~ .lg-label,
        .lg-input:not(:placeholder-shown) ~ .lg-label {
          top: 10px;
          transform: none;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7c3aed;
        }

        .lg-cta {
          background: linear-gradient(135deg, #7c3aed 0%, #db2777 55%, #f59e0b 100%);
          background-size: 200% 200%;
          transition: background-position 0.5s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .lg-cta:hover {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(124,58,237,0.35);
        }
        .lg-cta::after {
          content: '';
          position: absolute;
          top: 0; left: -120%;
          width: 65%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-18deg);
          transition: left 0.55s ease;
        }
        .lg-cta:hover::after { left: 170%; }

        .lg-gbtn { position: relative; overflow: hidden; }
        .lg-gbtn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 55%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(109,40,217,0.04), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .lg-gbtn:hover::after { left: 160%; }

        /* FIXED: cursor glow uses left/top with translate(-50%,-50%) */
        .lg-cglow {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,40,217,0.09) 0%, rgba(219,39,119,0.05) 40%, transparent 65%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 2;
          opacity: 0;
          will-change: left, top;
        }

        .lg-orb1 {
          position: absolute; width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,40,217,0.07) 0%, rgba(219,39,119,0.04) 45%, transparent 70%);
          top: -100px; right: -140px;
          pointer-events: none; filter: blur(1px);
          z-index: 0;
        }
        .lg-orb2 {
          position: absolute; width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, rgba(16,185,129,0.04) 45%, transparent 70%);
          bottom: -80px; left: -90px;
          pointer-events: none;
          z-index: 0;
        }

        .lg-pulse { animation: lg-pulse-anim 2.2s ease-out infinite; }
        @keyframes lg-pulse-anim {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }

        .lg-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(109,40,217,0.07);
          animation: lg-spin 20s linear infinite;
          pointer-events: none;
        }
        @keyframes lg-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .lg-ring::before {
          content: '';
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          top: 0; left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(167,139,250,0.7);
        }

        .lg-corner {
          position: absolute; bottom: 0; right: 0;
          width: 160px; height: 160px;
          border-top: 1px solid rgba(109,40,217,0.15);
          border-left: 1px solid rgba(109,40,217,0.15);
          border-radius: 100% 0 0 0;
          pointer-events: none;
          z-index: 3;
        }

        .lg-logo-grad {
          background: linear-gradient(135deg, #1a1b21 20%, #6d28d9 70%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      
        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .lg-left-panel { width: 40% !important; }
        }
        @media (max-width: 768px) {
          .lg-container {
            flex-direction: column !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            min-height: 100vh !important;
          }
          .lg-left-panel { display: none !important; }
          .lg-right-panel {
            flex: 1 !important;
            min-height: 100vh !important;
            height: auto !important;
            padding: 2rem 1.1rem 3rem !important;
            align-items: flex-start !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
          }
          .lg-mobile-header { display: flex !important; }
          .lg-form-card {
            max-width: 100% !important;
            width: 100% !important;
            border-radius: 16px !important;
            padding: 1.5rem 1.25rem !important;
            margin: 0 !important;
          }
          .lg-orb1 { width: 260px !important; height: 260px !important; top: -60px !important; right: -80px !important; }
          .lg-orb2 { width: 200px !important; height: 200px !important; }
          .lg-ring { display: none !important; }
          .lg-cglow { display: none !important; }
        }
        @media (max-width: 400px) {
          .lg-right-panel { padding: 1.5rem 0.85rem 2.5rem !important; }
          .lg-form-card { padding: 1.25rem 1rem !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="lg-dm lg-container"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          background: "#faf8ff",
          overflow: "hidden",
        }}
      >
        {/* LEFT PANEL */}
        <div
          ref={leftPanelRef}
          className="lg-left-panel"
          style={{
            width: "42%",
            minHeight: "100vh",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* FIX: bg image starts opacity:0 and fades in once loaded */}
          <div
            ref={bgImageRef}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.55) brightness(0.72)",
              opacity: 0, // starts hidden, GSAP fades in after load
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg,rgba(250,248,255,0.18) 0%,rgba(109,40,217,0.12) 40%,rgba(250,248,255,0.88) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 100px rgba(0,0,0,0.28)",
            }}
          />
          <div className="lg-corner" />
          <div
            className="lg-grain"
            style={{ position: "absolute", inset: 0, zIndex: 2 }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 4,
              padding: "clamp(2rem,5vw,3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
          >
            <div>
              <h1
                ref={logoRef}
                className="lg-bebas lg-logo-grad"
                style={{
                  fontSize: "clamp(3rem,8vw,5.5rem)",
                  letterSpacing: "0.22em",
                  lineHeight: 1,
                  opacity: 0,
                }}
              >
                SNITCH
              </h1>
              <div
                ref={logoBarRef}
                style={{
                  height: 2,
                  marginTop: 6,
                  background:
                    "linear-gradient(90deg,#7c3aed,#db2777,transparent)",
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />
              <span
                ref={logoTagRef}
                style={{
                  display: "block",
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  marginTop: 10,
                  opacity: 0,
                  color: "rgba(109,40,217,0.75)",
                  fontWeight: 600,
                }}
              >
                Premium Streetwear
              </span>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                {badges.map(({ ref, label, color, bg, border }) => (
                  <span
                    key={label}
                    ref={ref}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      borderRadius: 100,
                      border: `1px solid ${border}`,
                      color,
                      background: bg,
                      backdropFilter: "blur(12px)",
                      opacity: 0,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p
                ref={quoteRef}
                className="lg-playfair"
                style={{
                  fontSize: "clamp(1.3rem,3vw,1.7rem)",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                  color: "#1a1b21",
                  marginBottom: 24,
                  opacity: 0,
                }}
              >
                "Welcome back.
                <br />
                The culture missed you."
              </p>
              <div
                ref={proofRef}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: 0,
                }}
              >
                <div
                  className="lg-pulse"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "flex" }}>
                  {[12, 27, 43, 56].map((n) => (
                    <div
                      key={n}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        marginRight: -8,
                        border: "2px solid rgba(250,248,255,0.9)",
                        backgroundImage: `url('https://i.pravatar.cc/28?img=${n}')`,
                        backgroundSize: "cover",
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    paddingLeft: 10,
                    fontSize: 12,
                    lineHeight: 1.55,
                    color: "#4a4455",
                  }}
                >
                  <strong style={{ color: "#1a1b21", fontWeight: 600 }}>
                    2.4M+ members
                  </strong>
                  <br />
                  already in the culture
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          ref={rightRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg-right-panel"
          style={{
            flex: 1,
            position: "relative",
            overflowX: "hidden",
            overflowY: "auto",
            background: "#faf8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          <div
            className="lg-dotgrid"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div ref={orb1Ref} className="lg-orb1" />
          <div ref={orb2Ref} className="lg-orb2" />

          {/* Mobile Header - only visible on small screens */}
          <div
            className="lg-mobile-header"
            style={{
              display: "none",
              flexDirection: "column",
              marginBottom: 28,
              paddingTop: 8,
              width: "100%",
            }}
          >
            <h1
              className="lg-bebas lg-logo-grad"
              style={{
                fontSize: "clamp(2.8rem,12vw,4rem)",
                letterSpacing: "0.22em",
                lineHeight: 1,
              }}
            >
              SNITCH
            </h1>
            <div
              style={{
                height: 2,
                marginTop: 6,
                background:
                  "linear-gradient(90deg,#7c3aed,#db2777,transparent)",
              }}
            />
            <span
              style={{
                display: "block",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginTop: 8,
                color: "rgba(109,40,217,0.75)",
                fontWeight: 600,
              }}
            >
              Premium Streetwear
            </span>
          </div>

          {/* cursor glow */}
          <div
            ref={cursorGlowRef}
            className="lg-cglow"
            style={{ left: 0, top: 0 }}
          />

          <div
            className="lg-ring"
            style={{
              position: "absolute",
              top: "10%",
              left: "20%",
              width: 360,
              height: 360,
              zIndex: 15,
              pointerEvents: "none",
            }}
          />
          <div
            className="lg-ring"
            style={{
              position: "absolute",
              top: "10%",
              left: "20%",
              width: 250,
              height: 250,
              borderColor: "rgba(219,39,119,0.06)",
              animationDuration: "13s",
              animationDirection: "reverse",
              zIndex: 15,
              pointerEvents: "none",
            }}
          />

          {/* Form card */}
          <div
            ref={formCardRef}
            className="lg-form-card"
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: 440,
              margin: "0 auto",
              padding: "clamp(1.5rem,4vw,2.5rem)",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: 20,
              border: "1px solid rgba(109,40,217,0.1)",
              boxShadow:
                "0 8px 48px rgba(109,40,217,0.08), 0 2px 12px rgba(0,0,0,0.04)",
              opacity: 0,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(219,39,119,0.08))",
                border: "1px solid rgba(124,58,237,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="1.8"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>

            <h2
              ref={formTitleRef}
              style={{
                fontSize: "clamp(1.4rem,3.5vw,1.7rem)",
                fontWeight: 700,
                color: "#1a1b21",
                letterSpacing: "-0.02em",
                marginBottom: 6,
                opacity: 0,
              }}
            >
              Welcome back
            </h2>
            <p
              ref={formSubRef}
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginBottom: 24,
                opacity: 0,
              }}
            >
              Sign in to your account to continue.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {/* Email */}
              <div
                ref={field1Ref}
                className="lg-field"
                style={{
                  background: "#f4f3fb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  opacity: 0,
                }}
                onMouseEnter={onFieldEnter}
                onMouseLeave={onFieldLeave}
              >
                <div
                  className="lg-ficon"
                  style={{
                    position: "absolute",
                    left: 15,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d1d5db",
                    transition: "color 0.2s",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  className="lg-input"
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                />
                <label className="lg-label" htmlFor="login-email">
                  Email address
                </label>
              </div>

              {/* Password */}
              <div
                ref={field2Ref}
                className="lg-field"
                style={{
                  background: "#f4f3fb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  opacity: 0,
                }}
                onMouseEnter={onFieldEnter}
                onMouseLeave={onFieldLeave}
              >
                <div
                  className="lg-ficon"
                  style={{
                    position: "absolute",
                    left: 15,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d1d5db",
                    transition: "color 0.2s",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <input
                  className="lg-input"
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                />
                <label className="lg-label" htmlFor="login-password">
                  Password
                </label>
                <button
                  id="login-pw-eye"
                  type="button"
                  onClick={handleTogglePw}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d1d5db",
                    padding: 4,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#7c3aed")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#d1d5db")
                  }
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              ref={forgotRef}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 10,
                marginBottom: 2,
                opacity: 0,
              }}
            >
              <a
                href="#"
                style={{
                  fontSize: 12,
                  color: "rgba(109,40,217,0.6)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7c3aed")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(109,40,217,0.6)")
                }
              >
                Forgot password?
              </a>
            </div>

            <button
              ref={ctaRef}
              type="button"
              onClick={handleCtaClick}
              className="lg-cta"
              style={{
                width: "100%",
                padding: "15px 0",
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.14em",
                borderRadius: 12,
                marginTop: 14,
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              SIGN IN
            </button>

            <div
              ref={dividerRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "18px 0",
                opacity: 0,
              }}
            >
              <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#d1d5db",
                  whiteSpace: "nowrap",
                }}
              >
                or continue with
              </span>
              <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            </div>

            <a
              ref={gBtnRef}
              href="/api/auth/google"
              className="lg-gbtn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
                padding: "13px 0",
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                transition: "border-color 0.2s, box-shadow 0.2s",
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(109,40,217,0.3)";
                e.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(109,40,217,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.06)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </a>

            <p
              ref={signUpRef}
              style={{
                textAlign: "center",
                marginTop: 18,
                fontSize: 13,
                color: "#9ca3af",
                opacity: 0,
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#7c3aed",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#5b21b6";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#7c3aed";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
