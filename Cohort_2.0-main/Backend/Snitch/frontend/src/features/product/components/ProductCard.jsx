import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const FALLBACK_IMGS = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556821840-3a63f15732ce?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
];

const CATEGORY_LABELS = ["NEW DROP", "TRENDING", "LIMITED", "BESTSELLER", "EXCLUSIVE"];
const CATEGORY_COLORS = ["#7c3aed", "#db2777", "#f59e0b", "#059669", "#0ea5e9"];

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const btnRef = useRef(null);
  const [wished, setWished] = useState(false);

  const imgSrc =
    product?.images?.[0]?.url ||
    FALLBACK_IMGS[index % FALLBACK_IMGS.length];

  const price = product?.price?.amout ?? product?.price?.amount ?? 1999;
  const currency = product?.price?.currency || "INR";
  const label = CATEGORY_LABELS[index % CATEGORY_LABELS.length];
  const labelColor = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -12,
      boxShadow: "0 32px 64px rgba(109,40,217,0.18), 0 8px 24px rgba(0,0,0,0.1)",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.6, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(btnRef.current, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 8px 24px rgba(109,40,217,0.06)",
      duration: 0.35,
      ease: "power2.inOut",
    });
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(btnRef.current, { y: 16, opacity: 0, duration: 0.25 });
  };

  const onBtnClick = (e) => {
    e.stopPropagation();
    gsap
      .timeline()
      .to(btnRef.current, { scale: 0.93, duration: 0.1 })
      .to(btnRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
  };

  const onWish = (e) => {
    e.stopPropagation();
    setWished((p) => !p);
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.7, rotate: -15 },
      { scale: 1, rotate: 0, duration: 0.45, ease: "back.out(2)" }
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .pc-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(109,40,217,0.06);
          border: 1px solid rgba(109,40,217,0.07);
          transition: border-color 0.3s;
          display: flex;
          flex-direction: column;
        }
        .pc-wrap:hover { border-color: rgba(109,40,217,0.18); }

        .pc-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/4;
          background: #f4f3fb;
          flex-shrink: 0;
        }
        .pc-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }
        .pc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,27,33,0.7) 0%, transparent 55%);
          opacity: 0;
          pointer-events: none;
        }
        .pc-label {
          position: absolute;
          top: 14px; left: 14px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 50px;
          color: #fff;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2;
        }
        .pc-wish {
          position: absolute;
          top: 12px; right: 12px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(8px);
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 3;
          transition: background 0.2s;
        }
        .pc-wish:hover { background: rgba(255,255,255,1); }

        .pc-add-btn {
          position: absolute;
          bottom: 14px; left: 14px; right: 14px;
          padding: 11px 0;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          z-index: 3;
          opacity: 0;
          transform: translateY(16px);
          position: absolute;
          overflow: hidden;
        }
        .pc-add-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-18deg);
          transition: left 0.5s;
        }
        .pc-add-btn:hover::after { left: 180%; }

        .pc-body {
          padding: 1.1rem 1.25rem 1.4rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pc-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1a1b21;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.01em;
        }
        .pc-desc {
          font-size: 0.82rem;
          color: #9ca3af;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }
        .pc-price {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a1b21;
          letter-spacing: -0.02em;
        }
        .pc-price span {
          font-size: 0.75rem;
          font-weight: 500;
          color: #9ca3af;
          margin-left: 3px;
        }
        .pc-stars {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .pc-star { color: #f59e0b; font-size: 12px; }
        .pc-rating-count {
          font-size: 10px;
          color: #9ca3af;
          margin-left: 4px;
        }
      `}</style>

      <div
        ref={cardRef}
        className="pc-wrap"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => navigate(`/product/${product?._id}`)}
      >
        {/* Image */}
        <div className="pc-img-wrap">
          <img ref={imgRef} src={imgSrc} alt={product?.title || "Product"} className="pc-img" />
          <div ref={overlayRef} className="pc-overlay" />

          {/* Category badge */}
          <div
            className="pc-label"
            style={{ background: `linear-gradient(135deg, ${labelColor}cc, ${labelColor}88)` }}
          >
            {label}
          </div>

          {/* Wishlist */}
          <button className="pc-wish" onClick={onWish} aria-label="Wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "#db2777" : "none"} stroke={wished ? "#db2777" : "#6e6882"} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>

          {/* Hover CTA */}
          <button ref={btnRef} className="pc-add-btn" onClick={onBtnClick}>
            Add to Cart
          </button>
        </div>

        {/* Body */}
        <div className="pc-body">
          <h3 className="pc-title">{product?.title || "Unnamed Product"}</h3>
          <p className="pc-desc">{product?.description || "Premium streetwear collection"}</p>
          <div className="pc-footer">
            <div className="pc-price">
              ₹{price.toLocaleString("en-IN")}
              <span>{currency}</span>
            </div>
            <div className="pc-stars">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="pc-star">{s}</span>
              ))}
              <span className="pc-rating-count">(24)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
