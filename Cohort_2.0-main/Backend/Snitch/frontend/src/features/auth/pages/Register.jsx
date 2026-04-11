import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("Buyer");
  const [isSeller, setIsSeller] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const { handleRegister } = useAuth();

  const navigate = useNavigate();

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
  const toggleRef = useRef(null);
  const field1Ref = useRef(null);
  const field2Ref = useRef(null);
  const field3Ref = useRef(null);
  const field4Ref = useRef(null);
  const ctaRef = useRef(null);
  const termsRef = useRef(null);
  const dividerRef = useRef(null);
  const gBtnRef = useRef(null);
  const signInRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const pillRef = useRef(null);
  const rightRef = useRef(null);
  const cglowRef = useRef(null);
  const containerRef = useRef(null);

  const calculateStrength = (pwd) => {
    let s = 0;
    if (pwd.length > 5) s++;
    if (pwd.length > 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    if (pwd.length === 0) return 0;
    if (s <= 2) return 1;
    if (s <= 4) return 2;
    return 3;
  };

  const strength = calculateStrength(formData.password);
  const strengthColor =
    strength === 0
      ? "transparent"
      : strength === 1
        ? "#f43f5e"
        : strength === 2
          ? "#f59e0b"
          : "#10b981";
  const strengthWidth =
    strength === 0
      ? "0%"
      : strength === 1
        ? "33%"
        : strength === 2
          ? "66%"
          : "100%";

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
          toggleRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.5,
        )
        .fromTo(
          [
            field1Ref.current,
            field2Ref.current,
            field3Ref.current,
            field4Ref.current,
          ],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
          0.62,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.05,
        )
        .fromTo(
          [termsRef.current, dividerRef.current],
          { opacity: 0 },
          { opacity: 1, stagger: 0.06, duration: 0.4 },
          1.15,
        )
        .fromTo(
          gBtnRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 },
          1.25,
        )
        .fromTo(
          signInRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.35,
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

  useEffect(() => {
    const fill = document.getElementById("reg-strength-fill");
    if (!fill) return;
    gsap.to(fill, { width: strengthWidth, duration: 0.4, ease: "power2.out" });
    fill.style.background = strengthColor;
  }, [strength, strengthWidth, strengthColor]);

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
    await handleRegister({
      email: formData.email,
      contact: formData.phone,
      password: formData.password,
      fullname: formData.fullName,
      isSeller,
    });

    navigate("/");
  };

  const handleTogglePw = () => {
    setShowPassword((p) => !p);
    gsap.fromTo(
      "#reg-pw-eye",
      { rotate: -15 },
      { rotate: 0, duration: 0.35, ease: "back.out(2)" },
    );
  };

  const handleSetType = (type) => {
    setAccountType(type);
    const pill = pillRef.current;
    if (!pill) return;
    const w = pill.parentElement.offsetWidth / 2 - 5;
    gsap.to(pill, {
      x: type === "Buyer" ? 0 : w,
      duration: 0.35,
      ease: "back.out(1.7)",
    });
    setIsSeller(type === "Seller");
  };

  const badges = [
    {
      ref: badge1Ref,
      label: "Streetwear",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.1)",
      border: "rgba(167,139,250,0.3)",
    },
    {
      ref: badge2Ref,
      label: "Exclusive Drops",
      color: "#f472b6",
      bg: "rgba(244,114,182,0.1)",
      border: "rgba(244,114,182,0.3)",
    },
    {
      ref: badge3Ref,
      label: "Since 2020",
      color: "#34d399",
      bg: "rgba(52,211,153,0.1)",
      border: "rgba(52,211,153,0.3)",
    },
  ];

  const fields = [
    {
      ref: field1Ref,
      id: "reg-fullName",
      name: "fullName",
      value: formData.fullName,
      type: "text",
      label: accountType === "Buyer" ? "Full name" : "Shop name",
      icon:
        accountType === "Buyer" ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
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
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        ),
    },
    {
      ref: field2Ref,
      id: "reg-email",
      name: "email",
      value: formData.email,
      type: "email",
      label: "Email address",
      icon: (
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
      ),
    },
    {
      ref: field3Ref,
      id: "reg-phone",
      name: "phone",
      value: formData.phone,
      type: "tel",
      label: "Phone number",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.42-1.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital@1&display=swap');
        .sn-font-bebas { font-family:'Bebas Neue',cursive; }
        .sn-font-playfair { font-family:'Playfair Display',serif; }

        .sn-scan { background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px); }
        .sn-vignette { box-shadow:inset 0 0 120px rgba(0,0,0,0.65); }

        .sn-field:focus-within { border-color:rgba(139,92,246,0.6)!important; box-shadow:0 0 0 3px rgba(139,92,246,0.1),0 0 16px rgba(139,92,246,0.07); }
        .sn-field:focus-within .sn-ficon { color:#8b5cf6!important; }

        .sn-input { padding:22px 14px 8px 44px; background:transparent; width:100%; color:#fff; outline:none; border-radius:13px; font-size:14px; font-family:'DM Sans',sans-serif; box-sizing:border-box; }
        .sn-input[type="password"] { padding-right:44px; }
        .sn-input:-webkit-autofill { -webkit-box-shadow:0 0 0 1000px #0c0c14 inset; -webkit-text-fill-color:#fff; }

        .sn-label { position:absolute; left:44px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,0.28); font-size:14px; pointer-events:none; transition:all 0.2s ease; font-family:'DM Sans',sans-serif; }
        .sn-input:focus ~ .sn-label,
        .sn-input:not(:placeholder-shown) ~ .sn-label { top:10px; transform:none; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#a78bfa; }

        .sn-cta { background:linear-gradient(135deg,#7c3aed 0%,#db2777 50%,#f59e0b 100%); background-size:200% 200%; transition:background-position 0.5s ease; }
        .sn-cta:hover { background-position:right center; }
        .sn-cta::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent); transform:skewX(-15deg); transition:left 0.55s ease; }
        .sn-cta:hover::after { left:160%; }

        .sn-gbtn { position:relative; overflow:hidden; }
        .sn-gbtn::after { content:''; position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(to right,transparent,rgba(255,255,255,0.04),transparent); transform:skewX(-20deg); transition:left 0.5s ease; }
        .sn-gbtn:hover::after { left:160%; }

        .sn-cglow { position:absolute; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.08) 0%,rgba(219,39,119,0.04) 40%,transparent 65%); pointer-events:none; transform:translate(-50%,-50%); z-index:1; opacity:0; }
        .sn-noise { background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"); background-repeat:repeat; background-size:160px 160px; }
        .sn-grid { background-image:radial-gradient(rgba(139,92,246,0.12) 1px,transparent 1px); background-size:24px 24px; }
        .sn-orb1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.1) 0%,rgba(219,39,119,0.06) 40%,transparent 70%); top:-120px; right:-160px; pointer-events:none; filter:blur(2px); }
        .sn-orb2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle,rgba(245,158,11,0.08) 0%,rgba(52,211,153,0.05) 40%,transparent 70%); bottom:-80px; left:-100px; pointer-events:none; }

        .sn-pulse { animation:sn-pulse-ring 2s ease-out infinite; }
        @keyframes sn-pulse-ring { 0%{box-shadow:0 0 0 0 rgba(52,211,153,0.5)} 70%{box-shadow:0 0 0 6px rgba(52,211,153,0)} 100%{box-shadow:0 0 0 0 rgba(52,211,153,0)} }

        .sn-corner { position:absolute; bottom:0; right:0; width:180px; height:180px; border-top:1px solid rgba(167,139,250,0.15); border-left:1px solid rgba(167,139,250,0.15); border-radius:100% 0 0 0; pointer-events:none; }
        .sn-title-grad { background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.7) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .sn-logo-grad { background:linear-gradient(135deg,#fff 30%,#c4b5fd 80%,#f9a8d4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      `}</style>

      <div
        ref={containerRef}
        className="min-h-screen flex flex-col md:flex-row bg-[#07070f] text-white"
        style={{ fontFamily: "'DM Sans',sans-serif" }}
      >
        {/* LEFT PANEL */}
        <div
          className="w-full md:w-[42%] relative flex-shrink-0 overflow-hidden"
          style={{ minHeight: "clamp(200px, 35vw, 100vh)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=687&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "saturate(0.5) brightness(0.7)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(165deg,rgba(7,7,15,.6) 0%,rgba(91,33,182,0.12) 45%,rgba(7,7,15,.95) 100%)",
            }}
          />
          <div className="absolute inset-0 sn-scan" />
          <div className="absolute inset-0 sn-vignette" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 20%,rgba(139,92,246,0.18) 0%,transparent 55%)",
            }}
          />
          <div className="sn-corner" />

          <div
            className="relative z-10 p-8 md:p-12 flex flex-col h-full"
            style={{ minHeight: "inherit", justifyContent: "space-between" }}
          >
            {/* Logo block */}
            <div>
              <h1
                ref={logoRef}
                className="sn-font-bebas sn-logo-grad leading-none opacity-0"
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
                    "linear-gradient(90deg,#8b5cf6,#ec4899,transparent)",
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

            {/* Quote + proof — only md+ */}
            <div className="hidden md:block mt-8">
              <p
                ref={quoteRef}
                className="sn-font-playfair italic text-[1.55rem] leading-[1.55] mb-6 opacity-0"
                style={{ color: "#c4b5fd" }}
              >
                "Wear the streets.
                <br />
                Own the culture."
              </p>
              <div
                ref={proofRef}
                className="flex items-center gap-3.5 opacity-0"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 sn-pulse"
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
          className="flex-1 relative overflow-hidden h-screen"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ background: "#07070f" }}
        >
          <div className="absolute inset-0 sn-grid pointer-events-none" />
          <div className="absolute inset-0 sn-noise pointer-events-none" />
          <div ref={orb1Ref} className="sn-orb1" />
          <div ref={orb2Ref} className="sn-orb2" />
          <div ref={cglowRef} className="sn-cglow" />

          {/* Centered form */}
          <div className="relative z-10 flex items-center justify-center min-h-full p-6 sm:p-8 md:p-12">
            <div className="w-full max-w-[415px] py-8 md:py-0">
              {/* Header */}
              <div className="mb-6">
                <h2
                  ref={formTitleRef}
                  className="sn-title-grad font-bold tracking-tight mb-1.5 opacity-0"
                  style={{ fontSize: "clamp(1.4rem,4vw,1.75rem)" }}
                >
                  Create your account
                </h2>
                <p
                  ref={formSubRef}
                  className="text-[13px] opacity-0"
                  style={{ color: "rgba(255,255,255,0.32)" }}
                >
                  Join the culture. Exclusive access awaits.
                </p>
              </div>

              {/* Toggle */}
              <div
                ref={toggleRef}
                className="flex rounded-[13px] p-[5px] mb-5 relative opacity-0"
                style={{
                  background: "#0e0e1a",
                  border: "1px solid rgba(139,92,246,0.18)",
                }}
              >
                <div
                  ref={pillRef}
                  className="absolute top-[5px] bottom-[5px] rounded-[9px]"
                  style={{
                    width: "calc(50% - 5px)",
                    background:
                      "linear-gradient(135deg,#7c3aed 0%,#db2777 100%)",
                    boxShadow: "0 2px 16px rgba(139,92,246,0.35)",
                  }}
                />
                {["Buyer", "Seller"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleSetType(type)}
                    className="flex-1 py-2.5 text-[13px] font-semibold rounded-[9px] z-10 relative"
                    style={{
                      color:
                        accountType === type
                          ? "#fff"
                          : "rgba(255,255,255,0.35)",
                      letterSpacing: "0.02em",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-[11px]">
                {fields.map(({ ref, id, name, type, label, icon, value }) => (
                  <div
                    key={id}
                    ref={ref}
                    className="sn-field relative rounded-[13px] opacity-0"
                    style={{
                      background: "#0e0e1a",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={onFieldEnter}
                    onMouseLeave={onFieldLeave}
                  >
                    <div
                      className="sn-ficon absolute left-[15px] top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none transition-colors"
                      style={{ color: "rgba(255,255,255,0.18)" }}
                    >
                      {icon}
                    </div>
                    <input
                      className="sn-input"
                      id={id}
                      name={name}
                      type={type}
                      placeholder=" "
                      autoComplete="off"
                      value={value}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, [name]: e.target.value }))
                      }
                    />
                    <label className="sn-label" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}

                {/* Password */}
                <div
                  ref={field4Ref}
                  className="sn-field relative rounded-[13px] opacity-0"
                  style={{
                    background: "#0e0e1a",
                    border: "1px solid rgba(255,255,255,0.07)",
                    paddingBottom: 0,
                  }}
                  onMouseEnter={onFieldEnter}
                  onMouseLeave={onFieldLeave}
                >
                  <div
                    className="sn-ficon absolute left-[15px] top-[calc(50%-4px)] -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none transition-colors"
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
                    className="sn-input"
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    autoComplete="off"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, password: e.target.value }))
                    }
                  />
                  <label className="sn-label" htmlFor="reg-password">
                    Password
                  </label>
                  <button
                    id="reg-pw-eye"
                    type="button"
                    onClick={handleTogglePw}
                    className="absolute right-3.5 top-[calc(50%-4px)] -translate-y-1/2 p-1 flex items-center transition-colors"
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
                  <div
                    className="h-[3px] rounded-b-[13px] overflow-hidden -mt-px"
                    style={{ background: "#1a1a2a" }}
                  >
                    <div
                      id="reg-strength-fill"
                      className="h-full rounded-b-[13px]"
                      style={{
                        width: "0%",
                        background: strengthColor,
                        transition: "background 0.3s",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                ref={ctaRef}
                type="button"
                onClick={handleCtaClick}
                className="sn-cta w-full py-[15px] text-white text-[13px] font-extrabold tracking-[0.14em] rounded-[13px] mt-[18px] relative overflow-hidden opacity-0"
                style={{ border: "none", cursor: "pointer" }}
              >
                CREATE MY ACCOUNT
              </button>

              {/* Terms */}
              <p
                ref={termsRef}
                className="text-center text-[11px] mt-[11px] leading-[1.6] opacity-0"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                By creating an account, you agree to our{" "}
                <a
                  href="#"
                  style={{ color: "rgba(167,139,250,0.65)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#a78bfa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(167,139,250,0.65)")
                  }
                >
                  Terms of Service
                </a>{" "}
                &amp;{" "}
                <a
                  href="#"
                  style={{ color: "rgba(167,139,250,0.65)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#a78bfa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(167,139,250,0.65)")
                  }
                >
                  Privacy Policy
                </a>
              </p>

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
                className="sn-gbtn w-full py-[13px] text-white text-[13px] font-semibold rounded-[13px] flex items-center justify-center gap-2.5 opacity-0 transition-all duration-200"
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
                Sign up with Google
              </button>

              {/* Sign In link */}
              <p
                ref={signInRef}
                className="text-center mt-[18px] pb-2 text-[13px] opacity-0"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
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
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
