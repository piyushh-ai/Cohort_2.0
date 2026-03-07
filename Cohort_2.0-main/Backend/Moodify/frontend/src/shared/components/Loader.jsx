import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060509",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Soundwave bars loader */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "5px",
          height: "36px",
        }}
      >
        {[0.5, 1, 0.7, 1, 0.5].map((h, i) => (
          <div
            key={i}
            style={{
              width: "6px",
              height: `${h * 36}px`,
              borderRadius: "3px",
              background: i < 2 ? "#d4a853" : i === 2 ? "#c8d870" : "#b8f256",
              animation: `moodWave 0.9s ease-in-out ${i * 0.12}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "rgba(245,239,227,0.35)",
          margin: 0,
        }}
      >
        Loading...
      </p>

      <style>{`
          @keyframes moodWave {
            from { transform: scaleY(0.3); opacity: 0.5; }
            to   { transform: scaleY(1);   opacity: 1;   }
          }
        `}</style>
    </div>
  );
};

export default Loader;
