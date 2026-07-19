import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProduct } = useProduct();
  const { product } = useSelector((s) => s.product);

  const [selectedVariantId, setSelectedVariantId] = useState("base");
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [bought, setBought] = useState(false);
  const buyRef = useRef(null);

  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const infoRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const divRef = useRef(null);
  const descRef = useRef(null);
  const sizesRef = useRef(null);
  const ctaRef = useRef(null);
  const breadRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (id) {
      handleGetProduct(id);
      setSelectedVariantId("base");
    }
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        breadRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        0,
      )
        .fromTo(
          imgRef.current,
          { opacity: 0, x: -40, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9 },
          0.1,
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -12, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
          0.25,
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.35,
        )
        .fromTo(
          priceRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.5,
        )
        .fromTo(
          divRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.6 },
          0.6,
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.7,
        )
        .fromTo(
          sizesRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.8,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.4)" },
          0.95,
        );
    }, pageRef);
    return () => ctx.revert();
  }, [product]);

  const onAddToCart = () => {
    gsap
      .timeline()
      .to(ctaRef.current, { scale: 0.94, duration: 0.1 })
      .to(ctaRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1,0.4)",
      });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const onBuyNow = () => {
    gsap
      .timeline()
      .to(buyRef.current, { scale: 0.93, duration: 0.09 })
      .to(buyRef.current, {
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1,0.45)",
      });
    setBought(true);
    setTimeout(() => setBought(false), 2200);
  };

  const activeVariant =
    selectedVariantId === "base"
      ? null
      : product?.variants?.find((v) => v._id === selectedVariantId);
  const price =
    activeVariant?.price?.amount ??
    product?.price?.amout ??
    product?.price?.amount ??
    1999;
  const currency =
    activeVariant?.price?.currency ?? product?.price?.currency ?? "INR";
  const stock = activeVariant?.stock ?? product?.stock ?? 0;

  const images = activeVariant?.images?.length
    ? activeVariant.images.map((i) => i.url)
    : product?.images?.length
      ? product.images.map((i) => i.url)
      : [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital@1&display=swap');

        .pd-page { font-family: 'DM Sans', sans-serif; background: #faf8ff; min-height: 100vh; }

        .pd-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #9ca3af; letter-spacing: 0.04em;
          padding-top: 100px;
          padding-bottom: 2rem;
          opacity: 0;
        }
        .pd-breadcrumb a {
          color: #7c3aed; text-decoration: none; font-weight: 500;
          transition: opacity 0.2s;
        }
        .pd-breadcrumb a:hover { opacity: 0.7; }
        .pd-breadcrumb span { color: #d1d5db; }

        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Image panel */
        .pd-img-panel { display: flex; flex-direction: column; gap: 1rem; }
        .pd-main-img {
          border-radius: 24px;
          overflow: hidden;
          width: 100%;
          /* fixed height so any resolution image fills neatly */
          height: min(560px, 72vw);
          background: #f0eef8;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-main-img img {
          width: 100%; height: 100%;
          object-fit: contain;   /* no cropping — full image always visible */
          object-position: center;
          display: block;
          transition: transform 0.55s ease;
          padding: 8px;          /* small breathing room */
        }
        .pd-main-img:hover img { transform: scale(1.03); }
        .pd-main-img-badge {
          position: absolute;
          top: 16px; left: 16px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px; border-radius: 50px;
          background: linear-gradient(135deg, #7c3aedcc, #db2777aa);
          color: #fff;
          backdrop-filter: blur(10px);
        }
        .pd-thumbs {
          display: flex; gap: 10px; overflow-x: auto;
          scrollbar-width: none;
        }
        .pd-thumbs::-webkit-scrollbar { display: none; }
        .pd-thumb {
          width: 72px; height: 90px; flex-shrink: 0;
          border-radius: 12px; overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer; transition: border-color 0.2s, transform 0.2s;
          background: #f0eef8;
        }
        .pd-thumb.active { border-color: #7c3aed; }
        .pd-thumb:hover { transform: scale(1.05); }
        .pd-thumb img { width: 100%; height: 100%; object-fit: contain; object-position: center; display: block; padding: 4px; }

        /* Info panel */
        .pd-info { display: flex; flex-direction: column; gap: 0; }

        .pd-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 50px;
          background: rgba(109,40,217,0.08);
          border: 1px solid rgba(109,40,217,0.18);
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #7c3aed;
          width: fit-content; margin-bottom: 16px;
          opacity: 0;
        }
        .pd-pulse { width: 6px; height: 6px; border-radius: 50%; background: #10b981; animation: ppulse 2s ease-out infinite; flex-shrink: 0; }
        @keyframes ppulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); } 50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); } }

        .pd-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          letter-spacing: 0.08em; line-height: 1;
          color: #1a1b21; margin: 0 0 4px 0;
          opacity: 0;
        }

        .pd-price-row {
          display: flex; align-items: baseline; gap: 12px;
          margin: 16px 0 20px;
          opacity: 0;
        }
        .pd-price {
          font-size: 2.2rem; font-weight: 800;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1;
        }
        .pd-currency { font-size: 13px; font-weight: 500; color: #9ca3af; }
        .pd-old-price {
          font-size: 1.1rem; color: #d1d5db;
          text-decoration: line-through; font-weight: 500;
        }
        .pd-discount {
          font-size: 11px; font-weight: 700;
          background: rgba(5,150,105,0.1);
          border: 1px solid rgba(5,150,105,0.2);
          color: #059669; padding: 3px 10px; border-radius: 50px;
        }

        .pd-divider {
          height: 1px; background: linear-gradient(90deg, rgba(109,40,217,0.15), transparent);
          margin: 4px 0 20px; transform-origin: left; opacity: 0;
        }

        .pd-desc {
          font-size: 14px; color: #6e6882; line-height: 1.75;
          margin-bottom: 24px; opacity: 0;
        }

        /* Sizes */
        .pd-sizes-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #4a4455; margin-bottom: 10px;
        }
        .pd-sizes { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px;}
        .pd-size-btn {
          width: 48px; height: 48px; border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          background: #4a4455de; font-size: 12px; font-weight: 700;
          color: #ffffffff; cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.18s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .pd-size-btn:hover { border-color: #7c3aed; color: #7c3aed; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(124,58,237,0.12); }
        .pd-size-btn.active { background: linear-gradient(135deg, #7c3aed, #db2777); border-color: transparent; color: #fff; box-shadow: 0 6px 16px rgba(124,58,237,0.3); }

        /* Qty + CTA */
        .pd-cta-row { display: flex; gap: 12px; align-items: center; opacity: 0; }
        .pd-qty {
          display: flex; align-items: center; gap: 0;
          border: 1.5px solid #e5e7eb; border-radius: 14px; overflow: hidden;
          background: #fff;
        }
        .pd-qty-btn {
          width: 44px; height: 52px; border: none; background: none;
          font-size: 1.3rem; color: #4a4455; cursor: pointer;
          transition: background 0.18s, color 0.18s;
          display: flex; align-items: center; justify-content: center;
        }
        .pd-qty-btn:hover { background: rgba(124,58,237,0.07); color: #7c3aed; }
        .pd-qty-num {
          min-width: 40px; text-align: center;
          font-size: 15px; font-weight: 700; color: #1a1b21;
        }
        .pd-add-btn {
          flex: 1; padding: 16px 24px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #1a1b21 0%, #3d3650 100%);
          color: #fff; font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; position: relative; overflow: hidden;
          transition: box-shadow 0.25s, opacity 0.2s;
        }
        .pd-add-btn:hover { box-shadow: 0 10px 30px rgba(26,27,33,0.3); opacity: 0.92; }
        .pd-add-btn.success { background: linear-gradient(135deg, #059669, #10b981) !important; }
        .pd-add-btn::after {
          content: ''; position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-18deg); transition: left 0.55s;
        }
        .pd-add-btn:hover::after { left: 180%; }
        .pd-buy-btn {
          flex: 1; padding: 16px 24px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
          color: #fff; font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; position: relative; overflow: hidden;
          transition: box-shadow 0.25s, opacity 0.2s, transform 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .pd-buy-btn:hover {
          box-shadow: 0 10px 30px rgba(124,58,237,0.4);
          transform: translateY(-2px);
        }
        .pd-buy-btn.bought { background: linear-gradient(135deg, #059669, #10b981) !important; }
        .pd-buy-btn::after {
          content: ''; position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-18deg); transition: left 0.55s;
        }
        .pd-buy-btn:hover::after { left: 180%; }
        .pd-wish-btn {
          width: 52px; height: 52px; border-radius: 14px;
          border: 1.5px solid #e5e7eb; background: #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .pd-wish-btn:hover { border-color: #db2777; background: rgba(219,39,119,0.04); transform: scale(1.08); }

        /* Meta pills */
        .pd-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 28px; padding-top: 24px;
          border-top: 1px solid rgba(109,40,217,0.07);
        }
        .pd-meta-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 50px;
          background: #f4f3fb; font-size: 11px;
          font-weight: 600; color: #6e6882; letter-spacing: 0.03em;
        }
        .pd-meta-pill svg { flex-shrink: 0; }

        /* Responsive */
        @media (max-width: 860px) {
          .pd-grid { grid-template-columns: 1fr; gap: 2rem; }
          .pd-breadcrumb { padding-top: 88px; }
        }
        @media (max-width: 480px) {
          .pd-cta-row { flex-wrap: wrap; }
          .pd-cta-btns { flex-direction: column; }
          .pd-add-btn, .pd-buy-btn { width: 100%; }
        }
      `}</style>

      <div ref={pageRef} className="pd-page">
        <Navbar />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1rem,4vw,2.5rem) 0",
          }}
        >
          {/* Breadcrumb */}
          <nav ref={breadRef} className="pd-breadcrumb">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </a>
            <span>/</span>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Streetwear
            </a>
            <span>/</span>
            <span style={{ color: "#4a4455" }}>
              {product?.title || "Product"}
            </span>
          </nav>

          {!product ? (
            <div
              style={{
                textAlign: "center",
                padding: "6rem 2rem",
                color: "#9ca3af",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
              <p style={{ fontWeight: 600 }}>Loading product...</p>
            </div>
          ) : (
            <div className="pd-grid" style={{ paddingBottom: "6rem" }}>
              {/* IMAGE PANEL */}
              <div ref={imgRef} className="pd-img-panel" style={{ opacity: 0 }}>
                <div className="pd-main-img">
                  <div className="pd-main-img-badge">NEW DROP</div>
                  <img src={images[selectedImg]} alt={product.title} />
                </div>
                {images.length > 1 && (
                  <div className="pd-thumbs">
                    {images.map((url, i) => (
                      <div
                        key={i}
                        className={`pd-thumb${selectedImg === i ? " active" : ""}`}
                        onClick={() => setSelectedImg(i)}
                      >
                        <img src={url} alt={`View ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* INFO PANEL */}
              <div className="pd-info">
                {/* Badge */}
                <div ref={badgeRef} className="pd-badge">
                  <span className="pd-pulse" />
                  {stock > 0 ? `In Stock · ${stock} left` : "Out of Stock"}
                </div>

                {/* Title */}
                <h1 ref={titleRef} className="pd-title">
                  {product.title}
                </h1>

                {/* Price */}
                <div ref={priceRef} className="pd-price-row">
                  <span className="pd-price">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                  <span className="pd-currency">{currency}</span>
                  <span className="pd-old-price">
                    ₹{(price * 1.3).toFixed(0)}
                  </span>
                  <span className="pd-discount">23% OFF</span>
                </div>

                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", gap: 2 }}>
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i} style={{ color: "#f59e0b", fontSize: 15 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    4.8 · 124 reviews
                  </span>
                </div>

                {/* Divider */}
                <div ref={divRef} className="pd-divider" />

                {/* Description */}
                <p ref={descRef} className="pd-desc">
                  {product.description ||
                    "Premium quality streetwear. Crafted for the bold, designed for the culture. Every drop is limited — don't sleep on it."}
                </p>

                {/* Variants */}
                {product?.variants && product.variants.length > 0 && (
                  <div ref={sizesRef}>
                    <div
                      className="pd-sizes-label"
                      style={{
                        color: "#475569",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      }}
                    >
                      Select Variant
                    </div>
                    <div className="pd-sizes" style={{ flexWrap: "wrap" }}>
                      <button
                        className={`pd-size-btn${selectedVariantId === "base" ? " active" : ""}`}
                        style={{ padding: "0 16px", width: "auto" }}
                        onClick={() => {
                          setSelectedVariantId("base");
                          setSelectedImg(0);
                          gsap.fromTo(
                            `.pd-size-btn.active`,
                            { scale: 0.88 },
                            { scale: 1, duration: 0.4, ease: "back.out(2)" },
                          );
                        }}
                      >
                        Default (Base)
                      </button>

                      {product.variants.map((v) => {
                        console.log(v);
                        
                        const attrLabel =
                          v.attributes && Object.keys(v.attributes).length > 0
                            ? Object.values(v.attributes).join(" - ")
                            : "Variant";
                        return (
                          <button
                            key={v._id}
                            className={`pd-size-btn${selectedVariantId === v._id ? " active" : ""}`}
                            style={{ padding: "0 16px", width: "auto" }}
                            onClick={() => {
                              setSelectedVariantId(v._id);
                              setSelectedImg(0); // reset image index to avoid out-of-bounds
                              gsap.fromTo(
                                `.pd-size-btn.active`,
                                { scale: 0.88 },
                                {
                                  scale: 1,
                                  duration: 0.4,
                                  ease: "back.out(2)",
                                },
                              );
                            }}
                          >
                            {attrLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CTA Row */}
                <div
                  ref={ctaRef}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    opacity: 0,
                  }}
                >
                  {/* Row 1: Qty + Wishlist */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div className="pd-qty">
                      <button
                        className="pd-qty-btn"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        −
                      </button>
                      <span className="pd-qty-num">{qty}</span>
                      <button
                        className="pd-qty-btn"
                        onClick={() => setQty((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="pd-wish-btn" aria-label="Wishlist">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#db2777"
                        strokeWidth="1.8"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                    <div
                      style={{
                        marginLeft: "auto",
                        fontSize: "11px",
                        color: "#9ca3af",
                        textAlign: "right",
                        lineHeight: 1.5,
                      }}
                    >
                      <strong style={{ color: "#1a1b21", display: "block" }}>
                        {stock > 0 ? `Only ${stock} left!` : "Unavailable"}
                      </strong>
                      in stock
                    </div>
                  </div>
                  {/* Row 2: Add to Bag + Buy Now */}
                  <div
                    className="pd-cta-btns"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <button
                      className={`pd-add-btn${added ? " success" : ""}`}
                      onClick={onAddToCart}
                    >
                      {added ? "✓ Added!" : "Add to Bag"}
                    </button>
                    <button
                      ref={buyRef}
                      className={`pd-buy-btn${bought ? " bought" : ""}`}
                      onClick={onBuyNow}
                    >
                      {bought ? (
                        <>✓ Order Placed!</>
                      ) : (
                        <>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          Buy Now
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Meta pills */}
                <div className="pd-meta">
                  {[
                    { icon: "🚚", text: "Free shipping above ₹999" },
                    { icon: "↩️", text: "14-day easy returns" },
                    { icon: "🔒", text: "Secure checkout" },
                    { icon: "✅", text: "100% authentic" },
                  ].map((m) => (
                    <div key={m.text} className="pd-meta-pill">
                      <span>{m.icon}</span>
                      {m.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
