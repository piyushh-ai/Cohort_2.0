import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const { allProducts } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    handleGetAllProducts();
  }, [isAuthenticated]);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=1920&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        heroSubRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      if (productsRef.current) {
        gsap.fromTo(
          ".product-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [imageLoaded, allProducts]);

  return (
    <div style={{ background: "#faf8ff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=1920&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6) saturate(1.2)",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #faf8ff 0%, transparent 100%)",
          }}
        />
        
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(4rem, 10vw, 8rem)",
              lineHeight: 1,
              letterSpacing: "0.15em",
              color: "#fff",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
              margin: 0,
            }}
          >
            SNITCH
          </h1>
          <p
            ref={heroSubRef}
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.05em",
              marginTop: "1rem",
              fontWeight: 500,
            }}
          >
            REDEFINING STREETWEAR CULTURE
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section
        ref={productsRef}
        style={{
          padding: "6rem clamp(1rem, 4vw, 2.5rem)",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7c3aed",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.18)",
              padding: "5px 14px",
              borderRadius: "50px",
              display: "inline-block",
              marginBottom: "14px",
            }}
          >
            Fresh from the drop
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "0.1em",
              color: "#1a1b21",
              margin: 0,
              lineHeight: 1,
            }}
          >
            LATEST DROPS
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #7c3aed, #db2777)",
              margin: "1rem auto 0",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product, i) => (
              <div key={product._id} className="product-card">
                <ProductCard product={product} index={i} />
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "4rem",
                color: "#9ca3af",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👕</div>
              <p style={{ fontWeight: 600, fontSize: "1.1rem", color: "#6e6882" }}>No drops yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;