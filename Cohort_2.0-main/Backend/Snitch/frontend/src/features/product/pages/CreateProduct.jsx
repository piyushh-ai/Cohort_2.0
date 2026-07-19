import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useProduct } from "../hooks/useProduct";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);

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

  // ─── Constants & Dynamic Values ──────────────────────
  const MAX_IMAGES = 7;
  const defaultImage =
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop";
  const displayImage =
    previewUrls.length > 0 ? previewUrls[activePreviewIndex] : defaultImage;

  // ─── Preload Left Panel Image ────────────────────────
  useEffect(() => {
    const img = new Image();
    img.src = displayImage;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, [displayImage]);

  // ─── GSAP Entrance Animations ────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel reveal
      gsap.fromTo(
        leftPanelRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
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
        0.2,
      )
        .fromTo(
          headerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.4,
        )
        .fromTo(
          previewRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6 },
          0.5,
        )
        .fromTo(
          fieldRefs.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          0.6,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.9,
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

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (selectedImages.length + files.length > MAX_IMAGES) {
      alert(`You can only upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const newFiles = [...selectedImages, ...files].slice(0, MAX_IMAGES);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setSelectedImages(newFiles);
    setPreviewUrls(newUrls);
    if (previewUrls.length === 0) {
      setActivePreviewIndex(0);
    }

    // Clean up input value so same files can be re-selected if needed
    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    const newFiles = selectedImages.filter((_, i) => i !== indexToRemove);
    const newUrls = previewUrls.filter((_, i) => i !== indexToRemove);
    setSelectedImages(newFiles);
    setPreviewUrls(newUrls);
    if (activePreviewIndex >= newUrls.length) {
      setActivePreviewIndex(Math.max(0, newUrls.length - 1));
    } else if (activePreviewIndex === indexToRemove) {
      setActivePreviewIndex(0);
    }
  };

  const onFieldEnter = (e) => {
    if (e.currentTarget.dataset.nofocus === "true") return;
    gsap.to(e.currentTarget, {
      scale: 1.015,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const onFieldLeave = (e) => {
    if (e.currentTarget.dataset.nofocus === "true") return;
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (selectedImages.length === 0) {
      alert("Please select at least 1 image.");
      return;
    }

    setIsSubmitting(true);

    gsap
      .timeline()
      .to(ctaRef.current, { scale: 0.96, duration: 0.1 })
      .to(ctaRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1,0.5)",
      });

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("description", formData.description);
    formPayload.append("priceAmount", Number(formData.amount));
    formPayload.append("priceCurrency", "INR");

    selectedImages.forEach((imgObj) => {
      formPayload.append("images", imgObj);
    });

    const attrObj = {};
    attributes.forEach(attr => {
      if (attr.key.trim()) {
        attrObj[attr.key.trim()] = attr.value.trim();
      }
    });
    formPayload.append("attributes", JSON.stringify(attrObj));

    await handleCreateProduct(formPayload);
    setIsSubmitting(false);
    navigate("/seller/dashboard"); // Redirect back to seller dashboard
  };

  const setFieldRef = (el, index) => {
    if (el && !fieldRefs.current.includes(el)) {
      fieldRefs.current[index] = el;
    }
  };

  useEffect(() => {
    // Cleanup generated object URLs
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line
  }, []);

  // ─── JSX ───────────────────────────────────────────
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:ital@1&display=swap');

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
          border-radius: 0;
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

        /* Image Upload Box */
        .cp-upload-box {
          border: 1px dashed rgba(109,40,217,0.3);
          background: rgba(109,40,217,0.03);
          border-radius: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 24px; cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .cp-upload-box:hover {
          border-color: rgba(109,40,217,0.6);
          background: rgba(109,40,217,0.06);
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
        
        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .cp-left-panel { width: 40% !important; }
        }
        @media (max-width: 768px) {
          .cp-container {
            flex-direction: column !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            min-height: 100vh !important;
            height: auto !important;
          }
          .cp-left-panel {
            width: 100% !important;
            min-height: auto !important;
            height: clamp(260px, 40vw, 380px) !important;
            flex: none !important;
          }
          .cp-right-panel {
            width: 100% !important;
            flex: none !important;
            padding: 2rem 1.1rem 3rem !important;
            min-height: auto !important;
            overflow: visible !important;
            display: block !important;
          }
          .cp-form-card {
            max-width: 100% !important;
            width: 100% !important;
            border-radius: 0 !important;
            padding: 1.5rem 1.25rem !important;
            margin: 0 !important;
          }
          .cp-orb1 { width: 240px !important; height: 240px !important; top: -60px !important; right: -80px !important; }
          .cp-orb2 { width: 180px !important; height: 180px !important; }
        }
        @media (max-width: 400px) {
          .cp-right-panel { padding: 1.5rem 0.85rem 2.5rem !important; }
          .cp-form-card { padding: 1.25rem 1rem !important; }
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>

      <div
        ref={containerRef}
        className="cp-dm cp-container"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          background: "#faf8ff",
          overflowX: "hidden",
        }}
      >
        {/* ═══════════════════════════════════════
            LEFT PANEL – Real-time Product Preview
        ═══════════════════════════════════════ */}
        <div
          ref={leftPanelRef}
          className="cp-left-panel"
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
              transition: "background-image 0.4s ease-in-out",
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

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                }}
              >
                <span
                  style={{ color: "#10b981", fontSize: 24, fontWeight: 700 }}
                >
                  ₹{formData.amount || "0.00"}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    textTransform: "uppercase",
                  }}
                >
                  INR
                </span>
              </div>

              {/* Multiple Upload Previews - Left Panel Gallery */}
              {previewUrls.length > 1 && (
                <div
                  style={{
                    marginTop: 32,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    zIndex: 10,
                  }}
                >
                  {previewUrls.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setActivePreviewIndex(i)}
                      style={{
                        width: 54,
                        height: 54,
                        cursor: "pointer",
                        border:
                          i === activePreviewIndex
                            ? "2px solid #ffffff"
                            : "1px solid rgba(255,255,255,0.2)",
                        opacity: i === activePreviewIndex ? 1 : 0.6,
                        transition: "all 0.2s ease",
                        overflow: "hidden",
                        borderRadius: 0,
                      }}
                    >
                      <img
                        src={url}
                        alt={`Gallery ${i}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT PANEL – Product Creation Form
        ═══════════════════════════════════════ */}
        <div
          className="cp-right-panel"
          style={{
            flex: 1,
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden",
            background: "#faf8ff",
            display: "flex",
            alignItems: "flex-start",
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
            className="cp-form-card"
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
              borderRadius: 0,
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
                Drop a new piece into the Snitch catalog. Define the style, set
                the price, build the hype.
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
                  background: "#e8e7ef",
                  border: "none",
                  borderRadius: 0,
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
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
                  background: "#e8e7ef",
                  border: "none",
                  borderRadius: 0,
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
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

              {/* Description */}
              <div
                ref={(el) => setFieldRef(el, 2)}
                className="cp-field"
                style={{
                  background: "#e8e7ef",
                  border: "none",
                  borderRadius: 0,
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
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="21" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="14" y1="18" x2="3" y2="18" />
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

               {/* ── Attributes key-value builder ── */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <label style={labelStyle}>Attributes</label>
                  <button
                    type="button"
                    onClick={() => setAttributes([...attributes, { key: "", value: "" }])}
                    style={{
                      fontSize: "0.78rem", fontWeight: 600,
                      color: "#7c3aed", background: "rgba(124,58,237,0.07)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "6px", padding: "4px 10px",
                      cursor: "pointer",
                    }}
                  >
                    + Add Attribute
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {attributes.map((attr, idx) => (
                    <div key={idx} className="attr-row">
                      <input
                        type="text"
                        placeholder="Key  (e.g. Color)"
                        value={attr.key}
                        onChange={(e) => {
                          const updated = [...attributes];
                          updated[idx] = { ...updated[idx], key: e.target.value };
                          setAttributes(updated);
                        }}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <input
                        type="text"
                        placeholder="Value  (e.g. Black)"
                        value={attr.value}
                        onChange={(e) => {
                          const updated = [...attributes];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setAttributes(updated);
                        }}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => setAttributes(attributes.filter((_, i) => i !== idx))}
                        disabled={attributes.length === 1}
                        style={{
                          width: "32px", height: "32px", flexShrink: 0,
                          borderRadius: "6px",
                          border: "1px solid #fecaca",
                          background: attributes.length === 1 ? "#f8fafc" : "#fff1f2",
                          color: attributes.length === 1 ? "#cbd5e1" : "#ef4444",
                          cursor: attributes.length === 1 ? "not-allowed" : "pointer",
                          fontSize: "1rem", fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multiple Image Upload / Previews */}
              <div
                ref={(el) => setFieldRef(el, 3)}
                data-nofocus="true" // prevent scale logic from breaking hover
                style={{ marginTop: 6 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{ fontSize: 13, fontWeight: 600, color: "#4b5563" }}
                  >
                    Image Gallery <span style={{ color: "#a78bfa" }}>*</span>
                  </label>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#9ca3af",
                      background: "#f3f4f6",
                      padding: "2px 8px",
                      borderRadius: 10,
                    }}
                  >
                    {previewUrls.length} / {MAX_IMAGES} files
                  </span>
                </div>

                <label htmlFor="prod-images" className="cp-upload-box">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    style={{ marginBottom: 8 }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span
                    style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}
                  >
                    Click to browse up to 7 images
                  </span>
                  <span
                    style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}
                  >
                    Supports PNG, JPG, WEBP
                  </span>
                </label>
                <input
                  id="prod-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />

                {/* Previews Row */}
                {previewUrls.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      marginTop: 14,
                    }}
                  >
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: 60,
                          height: 60,
                          borderRadius: 0,
                          overflow: "hidden",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          border:
                            index === activePreviewIndex
                              ? "2px solid #7c3aed"
                              : "2px solid transparent",
                        }}
                      >
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            width: 18,
                            height: 18,
                            background: "rgba(239,68,68,0.9)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontSize: 10,
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Notice text */}
                {previewUrls.length > 0 && (
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
                    * Supported limits are 1 to {MAX_IMAGES} images.
                  </p>
                )}
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
                  borderRadius: 0,
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
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgba(255,255,255,0.3)"
                      />
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    CREATING...
                  </>
                ) : (
                  <>
                    PUBLISH PRODUCT
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
    </>
  );
};

export default CreateProduct;

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  color: "#475569",
  fontSize: "0.9rem",
  fontWeight: 500,
};

const inputStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  padding: "10px 12px",
  fontSize: "0.9rem",
  color: "#1e293b",
  background: "#ffffff",
  outline: "none",
  transition: "border 0.2s",
};

const rowStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};