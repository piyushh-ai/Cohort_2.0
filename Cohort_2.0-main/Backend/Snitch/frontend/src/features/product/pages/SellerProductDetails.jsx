import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const SellerProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProduct, handleCreateVariant } = useProduct();
  const { product } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [variantForm, setVariantForm] = useState({
    priceAmount: "",
    priceCurrency: "INR",
    attributesStr: "{\n  \"Color\": \"Black\",\n  \"Size\": \"L\"\n}",
  });
  const [variantImages, setVariantImages] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      await handleGetProduct(id);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!loading && product) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".animate-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, product]);

  const handleAddVariant = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("priceAmount", variantForm.priceAmount);
    formData.append("priceCurrency", variantForm.priceCurrency);
    
    try {
      const parsedAttr = JSON.parse(variantForm.attributesStr);
      // Mongoose Map might accept object directly if parsed, but multipart sends strings.
      // We'll append attributes as string or properties
      formData.append("attributes", JSON.stringify(parsedAttr));
    } catch(err) {
      alert("Invalid JSON for Attributes");
      setSubmitting(false);
      return;
    }

    variantImages.forEach((img) => {
      formData.append("images", img);
    });

    await handleCreateVariant(id, formData);
    await handleGetProduct(id); // refresh
    setSubmitting(false);
    setVariantForm({
      priceAmount: "",
      priceCurrency: "INR",
      attributesStr: "{\n  \"Color\": \"\",\n  \"Size\": \"\"\n}",
    });
    setVariantImages([]);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8fafc" }}>
        <p style={{ fontSize: "1.2rem", color: "#64748b" }}>Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8fafc" }}>
        <p style={{ fontSize: "1.2rem", color: "#ef4444" }}>Product not found</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        minHeight: "100vh",
        padding: "4rem 2rem",
        fontFamily: "'Inter', sans-serif",
      }}
      ref={containerRef}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/seller/dashboard")}
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "2rem",
            fontWeight: 500,
            color: "#64748b",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#0f172a")}
          onMouseOut={(e) => (e.target.style.color = "#64748b")}
        >
          &larr; Back to Dashboard
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Base Product Info */}
          <div className="animate-card" style={cardStyle}>
            <h2 style={{ fontSize: "1.8rem", color: "#0f172a", marginBottom: "1rem" }}>{product.title}</h2>
            <p style={{ color: "#64748b", marginBottom: "1.5rem", lineHeight: 1.6 }}>{product.description}</p>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <div style={badgeStyle}>Base Price: {product.price?.currency} {product.price?.amount}</div>
              <div style={badgeStyle}>Stock: {product.stock}</div>
            </div>

            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", marginBottom: "1rem" }}>Base Images</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`base-${idx}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
              ))}
            </div>
          </div>

          {/* Add Variant Form */}
          <div className="animate-card" style={{ ...cardStyle, background: "white" }}>
            <h3 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "1.5rem" }}>Add New Variant</h3>
            <form onSubmit={handleAddVariant} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Price Amount</label>
                  <input
                    type="number"
                    value={variantForm.priceAmount}
                    onChange={(e) => setVariantForm({ ...variantForm, priceAmount: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Currency</label>
                  <select
                    value={variantForm.priceCurrency}
                    onChange={(e) => setVariantForm({ ...variantForm, priceCurrency: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Attributes (JSON format)</label>
                <textarea
                  rows="4"
                  value={variantForm.attributesStr}
                  onChange={(e) => setVariantForm({ ...variantForm, attributesStr: e.target.value })}
                  style={{ ...inputStyle, fontFamily: "monospace", resize: "vertical" }}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Variant Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setVariantImages(Array.from(e.target.files))}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.8rem",
                    border: "2px dashed #cbd5e1",
                    borderRadius: "8px",
                    background: "#f8fafc",
                    cursor: "pointer",
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #db2777)",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  marginTop: "1rem",
                  boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
                }}
              >
                {submitting ? "Adding Variant..." : "Add Variant"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Variants */}
        <div className="animate-card" style={{ marginTop: "3rem" }}>
          <h3 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "1.5rem" }}>Existing Variants ({product.variants?.length || 0})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {product.variants?.map((variant, idx) => (
              <div key={idx} style={{ ...cardStyle, background: "white", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  {variant.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`var-${idx}-${i}`}
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={badgeStyle}>Price: {variant.price?.currency} {variant.price?.amount}</span>
                  <span style={badgeStyle}>Stock: {variant.stock}</span>
                </div>
                <div style={{ marginTop: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "6px" }}>
                  <h4 style={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", marginBottom: "0.5rem" }}>Attributes</h4>
                  {Object.entries(variant.attributes || {}).map(([key, value]) => (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#0f172a" }}>
                      <strong>{key}:</strong> <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderRadius: "16px",
  padding: "2rem",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.05)",
};

const badgeStyle = {
  background: "#f1f5f9",
  color: "#334155",
  padding: "0.4rem 0.8rem",
  borderRadius: "50px",
  fontSize: "0.9rem",
  fontWeight: 600,
  border: "1px solid #e2e8f0"
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  color: "#475569",
  fontSize: "0.9rem",
  fontWeight: 500,
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "1rem",
  background: "white",
  color: "#0f172a",
  outline: "none",
  transition: "border-color 0.2s",
};

export default SellerProductDetails;
