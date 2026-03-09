import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#04050a",
        gap: "20px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "linear-gradient(135deg, #ef4444, #f97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          boxShadow: "0 0 28px rgba(239,68,68,.4)",
          marginBottom: 8,
        }}
      >
        🎬
      </div>

      {/* Spinner dots */}
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ef4444",
              display: "inline-block",
              animation: "pr-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
          @keyframes pr-bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40%            { transform: scale(1);   opacity: 1;   }
          }
        `}</style>
    </div>
  );
};

export default Loader;
