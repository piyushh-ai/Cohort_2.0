import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/Style.scss";
import { GoogleIcon } from "../../../shared/icons/icons";

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
        Build your<br />
        <span className="gradient-word">knowledge vault.</span>
      </h2>
      <p className="auth-panel-subtext">
        Join thousands of curious people who never lose great content again.
        Free forever. No credit card needed.
      </p>

      <div className="auth-panel-features">
        {[
          {
            icon: "🗂",
            bg: "rgba(56,189,248,0.12)",
            title: "Unlimited collections",
            sub: "Organize anything, your way",
          },
          {
            icon: "🤖",
            bg: "rgba(167,139,250,0.12)",
            title: "AI-powered insights",
            sub: "Highlights generated automatically",
          },
          {
            icon: "🔁",
            bg: "rgba(52,211,153,0.12)",
            title: "Resurface engine",
            sub: "Rediscover forgotten gems",
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
        "2,400+ collectors already<br />
        building their vault."
      </p>
    </div>
  </div>
);

const Register = () => {
  const { register, googleLogin, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    clearError();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="auth-page">
      <AuthLeftPanel />

      <div className="auth-right-panel">
        <div className="auth-card">

          {/* Mobile-only header */}
          <div className="auth-header">
            <div className="auth-logo-icon">CL</div>
            <h1 className="auth-logo">Collectra</h1>
            <p className="auth-subtitle">Create your account</p>
          </div>

          {/* Desktop form title */}
          <div className="auth-form-title">
            <h2>Create your vault</h2>
            <p>Free forever. Start saving in under 30 seconds.</p>
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
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="piyushsirolia"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? (
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
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : "Create my vault →"}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <button className="google-btn" onClick={googleLogin} type="button">
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="auth-switch">
            Already have a vault? <Link to="/login">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;