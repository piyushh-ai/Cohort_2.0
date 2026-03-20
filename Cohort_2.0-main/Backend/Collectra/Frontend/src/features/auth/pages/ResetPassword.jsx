import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        New password,<br />
        <span className="gradient-word">fresh start.</span>
      </h2>
      <p className="auth-panel-subtext">
        Choose something strong. Your vault and all your collections will
        be waiting right where you left them.
      </p>

      <div className="auth-panel-features">
        {[
          {
            icon: "💪",
            bg: "rgba(56,189,248,0.12)",
            title: "Pick a strong password",
            sub: "8+ characters recommended",
          },
          {
            icon: "🔐",
            bg: "rgba(167,139,250,0.12)",
            title: "Single-use link",
            sub: "This link works only once",
          },
          {
            icon: "✅",
            bg: "rgba(52,211,153,0.12)",
            title: "Instant access",
            sub: "Sign in right after reset",
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
        "Almost there —<br />
        your vault is one step away."
      </p>
    </div>
  </div>
);

// Reusable eye icon
const EyeIcon = ({ show }) =>
  show ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );

const ResetPassword = () => {
  const { id, token } = useParams();
  const { resetPassword, loading, error } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    const response = await resetPassword(id, token, password);
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
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
              <h2 className="success-title">Password updated!</h2>
              <p className="success-text">
                Your vault is secured with your new password. Ready to dive back in?
              </p>
              <Link
                to="/login"
                className="auth-btn"
                style={{ textDecoration: "none", marginTop: "8px" }}
              >
                Sign in now →
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
            <p className="auth-subtitle">Set a new password</p>
          </div>

          <div className="auth-form-title">
            <h2>Set new password</h2>
            <p>Make it strong. You won't need to do this again.</p>
          </div>

          {(error || localError) && (
            <div className="auth-error">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
              <span>{localError || error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setLocalError(null); setPassword(e.target.value); }}
                  placeholder="Min 6 characters"
                  autoComplete="new-password"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword((p) => !p)}>
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>

            {/* Password strength */}
            {password && (
              <div className="password-strength">
                <div className="strength-bars">
                  <div className={`strength-bar ${password.length >= 1 ? "active" : ""} ${password.length >= 8 ? "strong" : "weak"}`} />
                  <div className={`strength-bar ${password.length >= 4 ? "active" : ""} ${password.length >= 8 ? "strong" : "weak"}`} />
                  <div className={`strength-bar ${password.length >= 8 ? "active strong" : ""}`} />
                </div>
                <span className="strength-label">
                  {password.length < 4 ? "Weak" : password.length < 8 ? "Fair" : "Strong"}
                </span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => { setLocalError(null); setConfirmPassword(e.target.value); }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm((p) => !p)}>
                  <EyeIcon show={showConfirm} />
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : "Reset Password →"}
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

export default ResetPassword;