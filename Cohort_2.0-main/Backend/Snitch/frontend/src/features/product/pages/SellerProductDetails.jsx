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
  });
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);
  const [variantImages, setVariantImages] = useState([]);
  const [variantImagePreviews, setVariantImagePreviews] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);

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

    // Build attributes object from key-value rows
    const attrObj = {};
    for (const { key, value } of attributes) {
      const k = key.trim();
      const v = value.trim();
      if (k) attrObj[k] = v;
    }
    formData.append("attributes", JSON.stringify(attrObj));

    variantImages.forEach((img) => {
      formData.append("images", img);
    });

    await handleCreateVariant(id, formData);
    await handleGetProduct(id);
    setSubmitting(false);
    setVariantForm({ priceAmount: "", priceCurrency: "INR" });
    setAttributes([{ key: "", value: "" }]);
    setVariantImages([]);
    
    // Revoke old previews to avoid memory leaks
    variantImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    setVariantImagePreviews([]);
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
      className="seller-product-details-page"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
      ref={containerRef}
    >
      <style>{`
        .seller-product-details-page { padding: 6rem 2rem; }
        @media (max-width: 600px) {
          .seller-product-details-page { padding: 5rem 1rem; }
        }
        .product-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 950px) {
          .product-layout-grid { grid-template-columns: 1fr; }
        }
        .form-row { display: flex; gap: 1rem; }
        @media (max-width: 500px) {
          .form-row { flex-direction: column; gap: 0.8rem; }
        }
        .attr-row { display: flex; gap: 0.5rem; align-items: center; }
        @media (max-width: 500px) {
          .attr-row { flex-direction: column; align-items: stretch; gap: 0.4rem; border: 1px solid #e2e8f0; padding: 0.8rem; border-radius: 8px; background: #f8fafc; }
          .attr-row button { align-self: flex-end; }
        }
        .existing-variants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 500px) {
          .existing-variants-grid { grid-template-columns: 1fr; }
        }
      `}</style>
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

        <div className="product-layout-grid">
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
              <div className="form-row">
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

              <div>
                <label style={labelStyle}>Variant Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setVariantImages(files);
                    
                    // Revoke old previews
                    variantImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
                    
                    // Generate new previews
                    const newPreviews = files.map(file => URL.createObjectURL(file));
                    setVariantImagePreviews(newPreviews);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.8rem",
                    border: "2px dashed #cbd5e1",
                    borderRadius: "8px",
                    background: "#f8fafc",
                    cursor: "pointer",
                  }}
                  required={variantImages.length === 0}
                />
                
                {/* Image Previews */}
                {variantImagePreviews.length > 0 && (
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
                    {variantImagePreviews.map((preview, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        <img
                          src={preview}
                          alt={`preview-${idx}`}
                          onClick={() => setFullScreenImage(preview)}
                          style={{
                            width: "80px", height: "80px", objectFit: "cover",
                            borderRadius: "8px", border: "1px solid #e2e8f0",
                            cursor: "pointer", transition: "transform 0.2s"
                          }}
                          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...variantImages];
                            const newPreviews = [...variantImagePreviews];
                            newImages.splice(idx, 1);
                            const removedPreview = newPreviews.splice(idx, 1)[0];
                            URL.revokeObjectURL(removedPreview);
                            setVariantImages(newImages);
                            setVariantImagePreviews(newPreviews);
                          }}
                          style={{
                            position: "absolute", top: "-6px", right: "-6px",
                            background: "#ef4444", color: "white", border: "none",
                            borderRadius: "50%", width: "20px", height: "20px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "12px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
          <div className="existing-variants-grid">
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

      {/* Full Screen Image Overlay */}
      {fullScreenImage && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0, 0, 0, 0.8)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(5px)"
          }}
          onClick={() => setFullScreenImage(null)}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen Preview"
            style={{
              maxHeight: "90%", maxWidth: "90%",
              objectFit: "contain", borderRadius: "8px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
            }}
          />
          <button
            style={{
              position: "absolute", top: "2rem", right: "2rem",
              background: "white", color: "#0f172a", border: "none",
              borderRadius: "50%", width: "40px", height: "40px",
              fontSize: "1.5rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
            onClick={() => setFullScreenImage(null)}
          >
            ×
          </button>
        </div>
      )}
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
