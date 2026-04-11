import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
//   const { handleLogin } = useAuth();

  const logoRef = useRef(null);
  const logoBarRef = useRef(null);
  const logoTagRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const quoteRef = useRef(null);
  const proofRef = useRef(null);
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
  const cglowRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
        0,
      )
        .fromTo(
          logoBarRef.current,
          { width: "0%" },
          { width: "100%", duration: 0.8, ease: "power2.inOut" },
          0.3,
        )
        .fromTo(
          logoTagRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          0.55,
        )
        .fromTo(
          [badge1Ref.current, badge2Ref.current, badge3Ref.current],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          0.65,
        )
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.85,
        )
        .fromTo(
          proofRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.15,
        )
        .fromTo(
          formTitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.25,
        )
        .fromTo(
          formSubRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.4,
        )
        .fromTo(
          [field1Ref.current, field2Ref.current],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          0.55,
        )
        .fromTo(
          forgotRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0.85,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.95,
        )
        .fromTo(
          dividerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.1,
        )
        .fromTo(
          gBtnRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 },
          1.2,
        )
        .fromTo(
          signUpRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.3,
        );

      gsap.to(orb1Ref.current, {
        y: -28,
        x: 14,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 22,
        x: -18,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = rightRef.current?.getBoundingClientRect();
    if (!rect) return;
    gsap.to(cglowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleMouseLeave = () =>
    gsap.to(cglowRef.current, { opacity: 0, duration: 0.3 });
  const onFieldEnter = (e) =>
    gsap.to(e.currentTarget, {
      scale: 1.012,
      duration: 0.25,
      ease: "power2.out",
    });
  const onFieldLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25 });

  const handleCtaClick = async () => {
    gsap
      .timeline()
      .to(ctaRef.current, { scale: 0.97, duration: 0.08 })
      .to(ctaRef.current, {
        scale: 1,
        duration: 0.35,
        ease: "elastic.out(1,0.4)",
      });
    // await handleLogin({ email: formData.email, password: formData.password });
  };

  const handleTogglePw = () => {
    setShowPassword((p) => !p);
    gsap.fromTo(
      "#login-pw-eye",
      { rotate: -15 },
      { rotate: 0, duration: 0.35, ease: "back.out(2)" },
    );
  };

  const badges = [
    {
      ref: badge1Ref,
      label: "Members Only",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.1)",
      border: "rgba(167,139,250,0.3)",
    },
    {
      ref: badge2Ref,
      label: "New Drops",
      color: "#f472b6",
      bg: "rgba(244,114,182,0.1)",
      border: "rgba(244,114,182,0.3)",
    },
    {
      ref: badge3Ref,
      label: "Free Shipping",
      color: "#34d399",
      bg: "rgba(52,211,153,0.1)",
      border: "rgba(52,211,153,0.3)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital@1&display=swap');
        .lg-bebas { font-family:'Bebas Neue',cursive; }
        .lg-playfair { font-family:'Playfair Display',serif; }

        .lg-scan { background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px); }
        .lg-vignette { box-shadow:inset 0 0 120px rgba(0,0,0,0.65); }

        .lg-field:focus-within { border-color:rgba(139,92,246,0.6)!important; box-shadow:0 0 0 3px rgba(139,92,246,0.1),0 0 16px rgba(139,92,246,0.07); }
        .lg-field:focus-within .lg-ficon { color:#8b5cf6!important; }

        .lg-input { padding:22px 14px 8px 44px; background:transparent; width:100%; color:#fff; outline:none; border-radius:13px; font-size:14px; font-family:'DM Sans',sans-serif; box-sizing:border-box; }
        .lg-input[type="password"] { padding-right:44px; }
        .lg-input:-webkit-autofill { -webkit-box-shadow:0 0 0 1000px #0c0c14 inset; -webkit-text-fill-color:#fff; }

        .lg-label { position:absolute; left:44px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.28); font-size:14px; pointer-events:none; transition:all 0.2s ease; font-family:'DM Sans',sans-serif; }
        .lg-input:focus ~ .lg-label,
        .lg-input:not(:placeholder-shown) ~ .lg-label { top:10px; transform:none; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#a78bfa; }

        .lg-cta { background:linear-gradient(135deg,#7c3aed 0%,#db2777 50%,#f59e0b 100%); background-size:200% 200%; transition:background-position 0.5s ease; }
        .lg-cta:hover { background-position:right center; }
        .lg-cta::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent); transform:skewX(-15deg); transition:left 0.55s ease; }
        .lg-cta:hover::after { left:160%; }

        .lg-gbtn { position:relative; overflow:hidden; }
        .lg-gbtn::after { content:''; position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(to right,transparent,rgba(255,255,255,0.04),transparent); transform:skewX(-20deg); transition:left 0.5s ease; }
        .lg-gbtn:hover::after { left:160%; }

        .lg-cglow { position:absolute; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.08) 0%,rgba(219,39,119,0.04) 40%,transparent 65%); pointer-events:none; transform:translate(-50%,-50%); z-index:1; opacity:0; }
        .lg-noise { background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"); background-repeat:repeat; background-size:160px 160px; }
        .lg-grid { background-image:radial-gradient(rgba(139,92,246,0.12) 1px,transparent 1px); background-size:24px 24px; }
        .lg-orb1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.1) 0%,rgba(219,39,119,0.06) 40%,transparent 70%); top:-120px; right:-160px; pointer-events:none; filter:blur(2px); }
        .lg-orb2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle,rgba(245,158,11,0.08) 0%,rgba(52,211,153,0.05) 40%,transparent 70%); bottom:-80px; left:-100px; pointer-events:none; }

        .lg-pulse { animation:lg-pulse-ring 2s ease-out infinite; }
        @keyframes lg-pulse-ring { 0%{box-shadow:0 0 0 0 rgba(52,211,153,0.5)} 70%{box-shadow:0 0 0 6px rgba(52,211,153,0)} 100%{box-shadow:0 0 0 0 rgba(52,211,153,0)} }

        .lg-corner { position:absolute; bottom:0; right:0; width:180px; height:180px; border-top:1px solid rgba(167,139,250,0.15); border-left:1px solid rgba(167,139,250,0.15); border-radius:100% 0 0 0; pointer-events:none; }

        .lg-title-grad { background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.7) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .lg-logo-grad { background:linear-gradient(135deg,#fff 30%,#c4b5fd 80%,#f9a8d4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        /* Welcome back illustration ring */
        .lg-ring { position:absolute; width:340px; height:340px; border-radius:50%; border:1px solid rgba(139,92,246,0.08); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; animation:lg-ring-spin 18s linear infinite; }
        .lg-ring-2 { width:240px; height:240px; border-color:rgba(219,39,119,0.07); animation-duration:12s; animation-direction:reverse; }
        @keyframes lg-ring-spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        .lg-ring::before { content:''; position:absolute; width:6px; height:6px; border-radius:50%; background:#a78bfa; top:0; left:50%; transform:translateX(-50%); box-shadow:0 0 8px #a78bfa; }
        .lg-ring-2::before { background:#f472b6; box-shadow:0 0 8px #f472b6; }
      `}</style>

      <div
        ref={containerRef}
        className="min-h-screen flex flex-col md:flex-row bg-[#07070f] text-white"
        style={{ fontFamily: "'DM Sans',sans-serif" }}
      >
        {/* LEFT PANEL */}
        <div
          className="w-full md:w-[42%] relative flex-shrink-0 overflow-hidden"
          style={{ minHeight: "clamp(200px,35vw,100vh)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.45) brightness(0.65)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg,rgba(7,7,15,.65) 0%,rgba(91,33,182,0.1) 45%,rgba(7,7,15,.96) 100%)",
            }}
          />
          <div className="absolute inset-0 lg-scan" />
          <div className="absolute inset-0 lg-vignette" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 30%,rgba(219,39,119,0.15) 0%,transparent 55%)",
            }}
          />
          <div className="lg-corner" />

          <div
            className="relative z-10 p-8 md:p-12 flex flex-col h-full"
            style={{ minHeight: "inherit", justifyContent: "space-between" }}
          >
            {/* Logo */}
            <div>
              <h1
                ref={logoRef}
                className="lg-bebas lg-logo-grad leading-none opacity-0"
                style={{
                  fontSize: "clamp(3rem,9vw,6rem)",
                  letterSpacing: "0.22em",
                }}
              >
                SNITCH
              </h1>
              <div
                ref={logoBarRef}
                className="h-[2px] mt-1.5"
                style={{
                  width: "0%",
                  background:
                    "linear-gradient(90deg,#ec4899,#8b5cf6,transparent)",
                }}
              />
              <span
                ref={logoTagRef}
                className="text-[10px] tracking-[0.28em] uppercase mt-2.5 opacity-0 block"
                style={{ color: "rgba(196,181,253,0.6)" }}
              >
                Premium Streetwear
              </span>
              <div className="flex gap-2 mt-4 flex-wrap">
                {badges.map(({ ref, label, color, bg, border }) => (
                  <span
                    key={label}
                    ref={ref}
                    className="text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full opacity-0"
                    style={{
                      border: `1px solid ${border}`,
                      color,
                      background: bg,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote + proof — md+ only */}
            <div className="hidden md:block mt-8">
              <p
                ref={quoteRef}
                className="lg-playfair italic text-[1.55rem] leading-[1.55] mb-6 opacity-0"
                style={{ color: "#f9a8d4" }}
              >
                "Welcome back.
                <br />
                The culture missed you."
              </p>
              <div
                ref={proofRef}
                className="flex items-center gap-3.5 opacity-0"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 lg-pulse"
                  style={{
                    background: "#34d399",
                    boxShadow: "0 0 8px #34d399",
                  }}
                />
                <div className="flex">
                  {[12, 27, 43, 56].map((n) => (
                    <div
                      key={n}
                      className="w-[30px] h-[30px] rounded-full -mr-[9px]"
                      style={{
                        border: "2px solid #07070f",
                        backgroundImage: `url('https://i.pravatar.cc/30?img=${n}')`,
                        backgroundSize: "cover",
                      }}
                    />
                  ))}
                </div>
                <div
                  className="pl-3 text-[12px] leading-[1.55]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <strong
                    style={{ color: "rgba(255,255,255,0.82)", fontWeight: 500 }}
                  >
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
          className="flex-1 relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ background: "#07070f" }}
        >
          <div className="absolute inset-0 lg-grid pointer-events-none" />
          <div className="absolute inset-0 lg-noise pointer-events-none" />
          <div ref={orb1Ref} className="lg-orb1" />
          <div ref={orb2Ref} className="lg-orb2" />
          <div ref={cglowRef} className="lg-cglow" />

          <div className="relative z-10 flex items-center justify-center min-h-full p-6 sm:p-8 md:p-12">
            <div className="w-full max-w-[415px] py-8 md:py-0">
              {/* Decorative spinning rings — desktop only */}
              <div className="hidden md:block relative h-0">
                <div
                  className="lg-ring"
                  style={{ position: "absolute", top: "-180px", left: "50%" }}
                />
                <div
                  className="lg-ring lg-ring-2"
                  style={{ position: "absolute", top: "-180px", left: "50%" }}
                />
              </div>

              {/* Header */}
              <div className="mb-8">
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(219,39,119,0.15))",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                  >
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </div>
                <h2
                  ref={formTitleRef}
                  className="lg-title-grad font-bold tracking-tight mb-1.5 opacity-0"
                  style={{ fontSize: "clamp(1.4rem,4vw,1.75rem)" }}
                >
                  Welcome back
                </h2>
                <p
                  ref={formSubRef}
                  className="text-[13px] opacity-0"
                  style={{ color: "rgba(255,255,255,0.32)" }}
                >
                  Sign in to your account to continue.
                </p>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-[11px]">
                {/* Email */}
                <div
                  ref={field1Ref}
                  className="lg-field relative rounded-[13px] opacity-0"
                  style={{
                    background: "#0e0e1a",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={onFieldEnter}
                  onMouseLeave={onFieldLeave}
                >
                  <div
                    className="lg-ficon absolute left-[15px] top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none transition-colors"
                    style={{ color: "rgba(255,255,255,0.18)" }}
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
                  className="lg-field relative rounded-[13px] opacity-0"
                  style={{
                    background: "#0e0e1a",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={onFieldEnter}
                  onMouseLeave={onFieldLeave}
                >
                  <div
                    className="lg-ficon absolute left-[15px] top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none transition-colors"
                    style={{ color: "rgba(255,255,255,0.18)" }}
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 flex items-center transition-colors"
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#a78bfa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
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

              {/* Forgot password */}
              <div
                ref={forgotRef}
                className="flex justify-end mt-3 mb-1 opacity-0"
              >
                <a
                  href="#"
                  className="text-[12px] transition-colors"
                  style={{ color: "rgba(167,139,250,0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#a78bfa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(167,139,250,0.6)")
                  }
                >
                  Forgot password?
                </a>
              </div>

              {/* CTA */}
              <button
                ref={ctaRef}
                type="button"
                onClick={handleCtaClick}
                className="lg-cta w-full py-[15px] text-white text-[13px] font-extrabold tracking-[0.14em] rounded-[13px] mt-[14px] relative overflow-hidden opacity-0"
                style={{ border: "none", cursor: "pointer" }}
              >
                SIGN IN
              </button>

              {/* Divider */}
              <div
                ref={dividerRef}
                className="flex items-center gap-3 my-[18px] opacity-0"
              >
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <span
                  className="text-[10px] tracking-[0.1em] uppercase whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  or continue with
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              </div>

              {/* Google */}
              <button
                ref={gBtnRef}
                type="button"
                className="lg-gbtn w-full py-[13px] text-white text-[13px] font-semibold rounded-[13px] flex items-center justify-center gap-2.5 opacity-0 transition-all duration-200"
                style={{
                  background: "#0e0e1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)";
                  e.currentTarget.style.background = "#131325";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "#0e0e1a";
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
              </button>

              {/* Sign up */}
              <p
                ref={signUpRef}
                className="text-center mt-[18px] pb-2 text-[13px] opacity-0"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold"
                  style={{ color: "#a78bfa" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                    e.currentTarget.style.color = "#c4b5fd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                    e.currentTarget.style.color = "#a78bfa";
                  }}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
