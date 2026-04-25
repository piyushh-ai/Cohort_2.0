import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);
  const navRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await handleGetSellerProducts();
      setIsLoading(false);
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const timeout = setTimeout(() => {

      const ctx = gsap.context(() => {
        gsap.fromTo(
          navRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        );

        // Filter out null refs before animating
        const validCards = cardsRef.current.filter(Boolean);
        if (validCards.length > 0) {
          gsap.fromTo(
            validCards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.3,
            },
          );
        }

        gsap.to(".db-orb1", {
          y: -30,
          x: 20,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".db-orb2", {
          y: 40,
          x: -30,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, containerRef);

      return () => ctx.revert();
    }, 50); // 50ms enough for DOM flush

    return () => clearTimeout(timeout);
  }, [isLoading, sellerProducts]);

  const onCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.012,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const onCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    const img = e.currentTarget.querySelector("img");
    if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:ital@1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .db-bebas { font-family: 'Bebas Neue', cursive; }
        .db-dm { font-family: 'DM Sans', sans-serif; }
        .db-playfair { font-family: 'Playfair Display', serif; }

        .db-grain::after {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px; pointer-events: none; z-index: 2;
        }

        .db-dotgrid {
          background-image: radial-gradient(circle, rgba(109,40,217,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .db-logo-grad {
          background: linear-gradient(135deg, #1a1b21 20%, #6d28d9 70%, #db2777 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .db-orb1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(109,40,217,0.06) 0%, rgba(219,39,119,0.03) 40%, transparent 65%);
          top: -100px; left: -150px; pointer-events: none; z-index: 0; filter: blur(30px);
        }
        .db-orb2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.05) 0%, rgba(16,185,129,0.03) 45%, transparent 70%);
          bottom: -150px; right: -100px; pointer-events: none; z-index: 0; filter: blur(30px);
        }

        .db-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white; border: none; padding: 12px 24px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px;
          cursor: pointer; z-index: 20; position: relative;
          text-transform: uppercase; letter-spacing: 1px;
          box-shadow: 0 4px 14px rgba(16,185,129,0.3); transition: all 0.3s ease;
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .db-btn:hover {
          box-shadow: 0 6px 20px rgba(16,185,129,0.4); transform: translateY(-2px);
        }
        
        .db-card {
          background: rgba(255,255,255,0.7); backdrop-filter: blur(20px);
          border: 1px solid rgba(109,40,217,0.08); border-radius: 16px;
          overflow: hidden; display: flex; flex-direction: column;
          box-shadow: 0 4px 24px rgba(0,0,0,0.03); cursor: pointer;
        }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          .db-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important; }
          .db-header-row { flex-direction: column; align-items: flex-start !important; gap: 16px; }
          .db-stats { display: none !important; }
        }
        @media (max-width: 480px) {
          .db-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="db-dm db-grain db-dotgrid"
        style={{
          minHeight: "100vh",
          position: "relative",
          background: "#faf8ff",
          overflowX: "hidden",
          paddingBottom: "4rem",
        }}
      >
        <div className="db-orb1" />
        <div className="db-orb2" />

        {/* ── Navbar ── */}
        <nav
          ref={navRef}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(250,248,255,0.85)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(109,40,217,0.1)",
            padding: "1rem 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1
                className="db-bebas db-logo-grad"
                style={{
                  fontSize: "2rem",
                  letterSpacing: "0.15em",
                  lineHeight: 1,
                }}
              >
                SNITCH
              </h1>
            </Link>
            <div
              style={{
                height: 20,
                width: 2,
                background: "rgba(109,40,217,0.15)",
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#4a4455",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Seller Dashboard
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              className="db-stats"
              style={{
                display: "flex",
                gap: 16,
                borderRight: "1px solid rgba(0,0,0,0.05)",
                paddingRight: 20,
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Total Drops
                </div>
                <div
                  style={{ fontSize: 18, color: "#1a1b21", fontWeight: 800 }}
                >
                  {sellerProducts?.length || 0}
                </div>
              </div>
            </div>

            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                padding: 2,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{ fontSize: 14, fontWeight: 800, color: "#7c3aed" }}
                >
                  DB
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Main Content ── */}
        <div style={{ position: "relative", zIndex: 10, padding: "3rem 5%" }}>
          <div
            className="db-header-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 32,
            }}
          >
            <div>
              <h2
                className="db-bebas"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "0.05em",
                  color: "#1a1b21",
                  lineHeight: 1.1,
                }}
              >
                Your Collections
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  marginTop: 8,
                  maxWidth: 500,
                  lineHeight: 1.6,
                }}
              >
                Manage your exclusive drops, track performance, and edit
                listings. Keep the culture moving.
              </p>
            </div>

            <Link to="/seller/create-product" className="db-btn">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              NEW DROP
            </Link>
          </div>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
              }}
            >
              <svg
                style={{ animation: "spin 1s linear infinite" }}
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" stroke="rgba(124,58,237,0.2)" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
          ) : sellerProducts?.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "6rem 2rem",
                background: "rgba(255,255,255,0.5)",
                borderRadius: 24,
                border: "1px dashed rgba(109,40,217,0.2)",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(109,40,217,0.4)"
                strokeWidth="1.5"
                style={{ margin: "0 auto 16px" }}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <h3
                style={{
                  fontSize: 20,
                  color: "#4a4455",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                No products yet
              </h3>
              <p style={{ color: "#9ca3af", fontSize: 14 }}>
                You haven't launched any drops. Start creating.
              </p>
            </div>
          ) : (
            <div
              className="db-grid"
              ref={gridRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {sellerProducts?.map((p, i) => (
                <div
                  key={p._id?.$oid || p._id || i}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="db-card"
                  onMouseEnter={onCardEnter}
                  onMouseLeave={onCardLeave}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 320,
                      overflow: "hidden",
                      background: "#f3f4f6",
                    }}
                  >
                    <img
                      src={
                        p.images && p.images.length > 0
                          ? p.images[0].url
                          : "https://via.placeholder.com/400x400?text=No+Image"
                      }
                      alt={p.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transformOrigin: "center",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 10px",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#10b981",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ACTIVE
                    </div>
                  </div>

                  <div style={{ padding: 20 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 8,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 18,
                          color: "#1a1b21",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                          textTransform: "capitalize",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {p.title}
                      </h3>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontSize: 13,
                            color: "#9ca3af",
                            marginRight: 4,
                          }}
                        >
                          INR
                        </span>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#10b981",
                          }}
                        >
                          {p.price?.amout || p.price?.amount || 0}
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        lineHeight: 1.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        marginBottom: 16,
                      }}
                    >
                      {p.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        paddingTop: 16,
                        marginTop: "auto",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: "#9ca3af",
                          fontWeight: 500,
                        }}
                      >
                        {p.images?.length || 0} Images Included
                      </span>
                      <Link
                        to={`/seller/product/${p._id}`}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#7c3aed",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          textDecoration: "none",
                        }}
                      >
                        EDIT ITEM
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
