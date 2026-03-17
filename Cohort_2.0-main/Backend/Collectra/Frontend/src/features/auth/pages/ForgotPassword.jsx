import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Style.scss";

const AuthLeftPanel = () => (
  <div className="auth-left-panel">
    <div className="auth-panel-grid" />
    <div className="auth-panel-particles">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="auth-particle" />
      ))}
    </div>
    {[1, 2, 3, 4, 5].map((n) => (
      <div key={n} className={`auth-panel-orb auth-panel-orb--${n}`} />
    ))}

    <div className="auth-panel-brand">
      <div className="auth-panel-logo-mark">CL</div>
      <span className="auth-panel-logo-name">Collectra</span>
    </div>

    <div className="auth-panel-center">
      <h2 className="auth-panel-headline">
        Locked out?<br />
        <span className="gradient-word">We've got you.</span>
      </h2>
      <p className="auth-panel-subtext">
        It happens to everyone. We'll send a secure reset link straight
        to your inbox. Back in 60 seconds.
      </p>

      <div className="auth-panel-features">
        {[
          {
            icon: "🔒",
            bg: "rgba(56,189,248,0.12)",
            title: "Secure reset link",
            sub: "Valid for 15 minutes only",
          },
          {
            icon: "📬",
            bg: "rgba(167,139,250,0.12)",
            title: "Instant delivery",
            sub: "Check spam if it's missing",
          },
          {
            icon: "🛡",
            bg: "rgba(52,211,153,0.12)",
            title: "Your data is safe",
            sub: "No passwords stored in plain text",
          },
        ].map((f) => (
          <div key={f.title} className="auth-feature-pill">
            <div className="auth-feature-icon" style={{ background: f.bg }}>
              {f.icon}
            </div>
            <div className="auth-feature-text">
              <strong>{f.title}</strong>
              {f.sub}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="auth-panel-footer">
      <p className="auth-panel-quote">
        "Your vault is waiting.<br />
        Let's get you back in."
      </p>
    </div>
  </div>
);

const ForgotPassword = () => {
  const { forgotPassword, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forgotPassword(email);
    if (response?.success) setSuccess(true);
  };

  // ─── Success State ─────────────────────────────────────
  if (success) {
    return (
      <div className="auth-page">
        <AuthLeftPanel />
        <div className="auth-right-panel">
          <div className="auth-card">

            <div className="auth-header">
              <div className="auth-logo-icon">CL</div>
              <h1 className="auth-logo">Collectra</h1>
            </div>

            <div className="auth-success">
              <div className="success-icon">
                <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                </svg>
              </div>
              <h2 className="success-title">Check your inbox</h2>
              <p className="success-text">
                We sent a reset link to <strong>{email}</strong>. It expires
                in 15 minutes.
              </p>
              <Link
                to="/login"
                className="auth-btn"
                style={{ textDecoration: "none", marginTop: "8px" }}
              >
                Back to Sign In
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <AuthLeftPanel />

      <div className="auth-right-panel">
        <div className="auth-card">

          <div className="auth-header">
            <div className="auth-logo-icon">CL</div>
            <h1 className="auth-logo">Collectra</h1>
            <p className="auth-subtitle">Reset your password</p>
          </div>

          <div className="auth-form-title">
            <h2>Reset password</h2>
            <p>Enter your email and we'll send you a secure link.</p>
          </div>

          <div className="auth-info">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <span>Link expires in 15 minutes. Check spam if missing.</span>
          </div>

          {error && (
            <div className="auth-error">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { clearError(); setEmail(e.target.value); }}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : "Send Reset Link →"}
            </button>
          </form>

          <p className="auth-switch">
            Remembered it? <Link to="/login">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;