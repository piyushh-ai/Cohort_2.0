import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          background: "#0d1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
          <div style={{ textAlign: "center", maxWidth: "400px", padding: "32px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", color: "#f85149", fontSize: "24px",
            }}>⚠</div>
            <h2 style={{ color: "#f0f6fc", fontSize: "18px", marginBottom: "10px" }}>
              Kuch toh gadbad hai
            </h2>
            <p style={{ color: "#8b949e", fontSize: "13px", marginBottom: "24px", lineHeight: 1.6 }}>
              App mein ek unexpected error aaya. Reload karo — sab theek ho jaayega.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#238636", color: "#fff", border: "none",
                borderRadius: "6px", padding: "10px 24px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
              }}
            >
              Reload karo →
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;